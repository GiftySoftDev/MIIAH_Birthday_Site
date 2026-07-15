import React, { useState, useEffect } from "react";
import { Heart, Send, Star, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const WishesSection = () => {
  const [expandedYears, setExpandedYears] = useState<Record<number, boolean>>({
  2026: true,
  2025: false,
});
  const [newWish, setNewWish] = useState("");
  const [wishAuthor, setWishAuthor] = useState("");
  const [wishes, setWishes] = useState<
    Array<{
      id: string;
      text: string;
      author: string;
      timestamp: string;
      createdAt?: string;
    }>
  >([]);

  const wishesByYear = wishes.reduce((acc, wish) => {
  const year = new Date(wish.timestamp).getFullYear();
  if (!acc[year]) acc[year] = [];
  acc[year].push(wish);
  return acc;
}, {} as Record<number, typeof wishes>);

  // Load wishes from Firestore
  useEffect(() => {
    const wishesRef = collection(db, "birthdayWishes");
    const q = query(wishesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const wishesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text || "",
            author: data.author || "",
            timestamp:
              data.createdAt?.toDate?.()?.toISOString() ||
              new Date().toISOString(),
            createdAt: data.createdAt,
          };
        });
        setWishes(wishesData);
      },
      (error) => {
        console.error("Error fetching wishes:", error);
        // Fallback to localStorage if Firebase fails
        const savedWishes = localStorage.getItem("miiahBirthdayWishes");
        if (savedWishes) {
          setWishes(JSON.parse(savedWishes));
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return diffInMinutes < 1 ? "Just now" : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSubmitWish = async () => {
    if (newWish.trim() && wishAuthor.trim()) {
      try {
        await addDoc(collection(db, "birthdayWishes"), {
          text: newWish.trim(),
          author: wishAuthor.trim(),
          createdAt: serverTimestamp(),
        });
        setNewWish("");
        setWishAuthor("");
      } catch (error) {
        console.error("Error adding wish:", error);
        // Fallback to localStorage
        const wish = {
          id: Date.now().toString(),
          text: newWish.trim(),
          author: wishAuthor.trim(),
          timestamp: new Date().toISOString(),
        };
        const updatedWishes = [wish, ...wishes];
        setWishes(updatedWishes);
        localStorage.setItem(
          "miiahBirthdayWishes",
          JSON.stringify(updatedWishes)
        );
        setNewWish("");
        setWishAuthor("");
      }
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Add New Wish */}
      <Card className="mb-12 shadow-2xl border-gold/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <Gift className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-navy mb-2">
              Share Your Birthday Wish
            </h3>
            <p className="font-cormorant text-lg text-charcoal">
              Leave a special message for the birthday girl
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <Input
              placeholder="Your name..."
              value={wishAuthor}
              onChange={(e) => setWishAuthor(e.target.value)}
              className="bg-cream border-gold/20 focus:border-gold rounded-xl font-cormorant text-lg"
            />
            <Textarea
              placeholder="Write your birthday wish here..."
              value={newWish}
              onChange={(e) => setNewWish(e.target.value)}
              className="bg-cream border-gold/20 focus:border-gold rounded-xl font-cormorant text-lg min-h-[120px] resize-none"
            />
            <Button
              onClick={handleSubmitWish}
              disabled={!newWish.trim() || !wishAuthor.trim()}
              className="w-full bg-gold hover:bg-gold/80 text-navy rounded-xl py-3 font-inter font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Birthday Wish
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wishes Display */}
      <div className="space-y-6">
        <h3 className="text-3xl font-semibold text-center text-navy mb-8 md:mt-32 lg:mt-48">
          Birthday Messages
        </h3>

     {Object.entries(wishesByYear)
  .sort(([a], [b]) => Number(b) - Number(a))
  .map(([year, yearWishes]) => (
    <div key={year} className="mb-10">
      <button
        onClick={() =>
          setExpandedYears(prev => ({
            ...prev,
            [Number(year)]: !prev[Number(year)],
          }))
        }
        className="flex items-center justify-between w-full mb-6"
      >
        <h3 className="text-3xl font-semibold text-navy">
          🎂 {year} Birthday Wishes ({yearWishes.length})
        </h3>

        <span>
          {expandedYears[Number(year)] ? "▲" : "▼"}
        </span>
      </button>

      {expandedYears[Number(year)] &&
        yearWishes.map((wish, index) => (
         <Card
            key={wish.id}
            className={`transform transition-all duration-500 hover:scale-105 shadow-xl border-gold/20 animate-slide-in-left`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6 bg-gradient-to-r from-white to-cream/50">
              <div className="flex items-start space-x-4">
                <div className="bg-gold rounded-full p-3 flex-shrink-0">
                  <Heart className="w-5 h-5 text-navy" />
                </div>
                {/* Add min-w-0 to allow flex item to shrink below its content size */}
                <div className="flex-1 min-w-0">
                  <blockquote className="font-cormorant text-lg text-charcoal mb-3 italic break-words">
                    "{wish.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gold" />
                      <span className="font-inter text-sm font-medium text-navy">
                        {wish.author}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-charcoal/70">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTimestamp(wish.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
))}
      </div>

      {/* Birthday Quote */}
      <div className="relative z-10 mt-16 text-center">
        <Card className="bg-gradient-gold border-gold/30 shadow-2xl">
          <CardContent className="p-8">
            <Star className="w-8 h-8 text-navy mx-auto mb-4" />
            <blockquote className="text-2xl md:text-3xl font-semibold text-navy mb-4 italic">
              The more you celebrate your life, the more there is in life to
              celebrate.
            </blockquote>
            <p className="font-cormorant text-lg text-charcoal">
              Here's to another year of creativity, friendship and successful
              careers! 🥂
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WishesSection;
