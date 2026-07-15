import React, { useState, useEffect, useCallback } from "react";
import { Clock, Sparkles, Star, Gift, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BirthdayGateProps {
  children: React.ReactNode;
}

export const BirthdayGate = ({ children }: BirthdayGateProps) => {
  const [viewMode, setViewMode] = useState<"gate" | "birthday" | "post">(
    "gate"
  );
  const [isTestMode, setIsTestMode] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const miiahFacts = [
    {
      fact: "MIIAH can turn any fabric scrap into something beautiful",
      emoji: "✂️",
      category: "Talent",
    },
    {
      fact: "MIIAH's neck cracking game is so strong, I fear she'll break her neck.",
      emoji: "🤯",
      category: "Superpower",
    },
    {
      fact: "MIIAH once painted a house herself, A freaking house!",
      emoji: "🎨🖌",
      category: "Superpower",
    },
    {
      fact: "MIIAH is launching her collection July 19th",
      emoji: "👗",
      category: "Vision",
    },
    {
      fact: "MIIAH's laugh can brighten any room instantly",
      emoji: "😊",
      category: "Magic",
    },
    {
      fact: "She remembers every detail about her friends' favourite things",
      emoji: "💕",
      category: "Heart",
    },
    {
      fact: "MIIAH can make any outfit look expensive, even thrift finds",
      emoji: "✨",
      category: "Style",
    },
    {
      fact: "MIIAH would've been a caterer if she wasn't a fashion designer",
      emoji: "👩‍🍳",
      category: "Career",
    },
    {
      fact: "MIIAH remembers little stuff about her friends. ",
      emoji: "💕",
      category: "Friendship",
    },
    {
      fact: "MIIAH can say a lot with her facial expression without speaking.",
      emoji: "😭",
      category: "Superpower",
    },
    {
      fact: "MIIAH rather walks away than engage in public arguments.",
      emoji: "✌",
      category: "Peace",
    },
    {
      fact: "MIIAH has five brothers but refused to gimme one.",
      emoji: "😂",
      category: "Jokes",
    },
    {
      fact: "MIIAH is creative and imaginative.",
      emoji: "🎨🖌",
      category: "Career",
    },
    {
      fact: "Nothing gets past MIIAH",
      emoji: "🤔🥉",
      category: "Quirk",
    },
    {
      fact: "MIIAH is a low-key cry baby.",
      emoji: "👶🍼🐥",
      category: "Hidden trait",
    },
    {
      fact: "MIIAH tackles hurdles with a positive mindset.",
      emoji: "🙆‍♀️",
      category: "Mindset",
    },
    {
      fact: "MIIAH runs two businesses.",
      emoji: "🦸‍♀️🚀",
      category: "Career",
    },
    {
      fact: " MIIAH has a brand that runs curated and custom surprise events.",
      emoji: "🎁🎊",
      category: "Career",
    },
  ];
  const [currentFact, setCurrentFact] = useState(0);
  const [showFact, setShowFact] = useState(true);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthdayMonth = 6;
    const birthdayDay = 19;

    let targetDate = new Date(currentYear, birthdayMonth, birthdayDay);

    const actualIsBirthdayToday =
      now.getMonth() === birthdayMonth && now.getDate() === birthdayDay;
    const actualIsPastBirthdayThisYear =
      now > targetDate && !actualIsBirthdayToday;

    if (actualIsPastBirthdayThisYear) {
      targetDate = new Date(currentYear + 1, birthdayMonth, birthdayDay);
    }

    if (
      viewMode === "post" &&
      !actualIsPastBirthdayThisYear &&
      !actualIsBirthdayToday
    ) {
      targetDate = new Date(currentYear + 1, birthdayMonth, birthdayDay);
    } else if (
      viewMode === "gate" &&
      (actualIsBirthdayToday || actualIsPastBirthdayThisYear)
    ) {
      if (now > new Date(currentYear, birthdayMonth, birthdayDay)) {
        targetDate = new Date(currentYear + 1, birthdayMonth, birthdayDay);
      } else {
        targetDate = new Date(currentYear, birthdayMonth, birthdayDay);
      }
    }

    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, [viewMode]);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % miiahFacts.length);
      setShowFact(false);
      setTimeout(() => setShowFact(true), 100);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(factInterval);
    };
  }, [calculateTimeLeft, miiahFacts.length]);

  const now = new Date();
  const currentYear = now.getFullYear();
  const birthdayMonth = 6;
  const birthdayDay = 19;
  const actualBirthdayDate = new Date(currentYear, birthdayMonth, birthdayDay);

  const isBirthdayTodayActual =
    now.getMonth() === birthdayMonth && now.getDate() === birthdayDay;
  const isPastBirthdayThisYearActual =
    now > actualBirthdayDate && !isBirthdayTodayActual;

  const effectiveIsBirthday =
    isTestMode || isBirthdayTodayActual || viewMode === "birthday";
  const effectiveIsPostBirthday =
    isPastBirthdayThisYearActual || viewMode === "post";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTestAccess = () => {
    setIsTestMode(true);
    setViewMode("birthday");
  };

  {
    /* Home page button for testing pre and post birthday mode */
  }
  if (effectiveIsBirthday) {
    return (
      <>
        {/* <div className="fixed top-4 right-4 z-50 flex gap-2">
          <Button
            onClick={() => setViewMode("gate")}
            className="bg-gold/20 hover:bg-gold/30 text-charcoal border border-gold/30 px-4 py-2 rounded-lg text-xs"
          >
            🔍 Pre-Birthday Page
          </Button>
          <Button
            onClick={() => setViewMode("post")}
            className="bg-gold/20 hover:bg-gold/30 text-charcoal border border-gold/30 px-4 py-2 rounded-lg text-xs"
          >
            🔍 Post-Birthday Page
          </Button>
        </div> */}
        {children}
      </>
    );
  }

  if (effectiveIsPostBirthday) {
    return (
      <div className="min-h-screen py-10 sm:py-20  bg-gradient-to-br from-cream via-white to-champagne flex items-center justify-center px-4">
        <Card className="max-w-4xl mx-auto shadow-md border-gold/20">
          <CardContent className="py-12 px-2 sm:p-12  text-center">
            <div className="mb-8">
              <Calendar className="w-16 h-16 text-gold mx-auto mb-6 animate-float" />
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-4">
                MIIAH's Birthday Has Passed
              </h1>
              <p className="font-cormorant text-xl text-charcoal mb-8">
                We hope she had the most wonderful celebration! Looking forward
                to next year's birthday.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm mb-8 border border-gold/20">
              <div className="flex items-center justify-center mb-8">
                <Gift className="w-8 h-8 text-gold mr-3" />
                <h3 className="font-playfair text-3xl font-semibold text-navy">
                  Next Year's Countdown
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`text-center animate-slide-in-left`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-gradient-gold rounded-2xl p-6 shadow-lg">
                      <div className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-2">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={() => setViewMode("birthday")}
                className="bg-gold hover:bg-gold/80 text-navy px-6 py-3 rounded-xl flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Birthday Site
              </Button>
              <Button
                onClick={() => setViewMode("gate")}
                className="bg-cream hover:bg-cream/80 text-charcoal border border-gold/30 px-6 py-3 rounded-xl flex items-center"
              >
                <Clock className="w-4 h-4 mr-2" />
                View Countdown Page
              </Button>
            </div>

            <p className="font-cormorant text-lg text-charcoal">
              Appreciate the website design, aesthetics and functionality
              anytime!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-20 bg-gradient-to-br from-cream via-white to-champagne flex items-center justify-center px-4">
      <Card className="max-w-4xl mx-auto shadow-md  border-gold/20">
        <CardContent className="py-12 px-2 sm:p-12 text-center">
          <div className="mb-8">
            <Clock className="w-16 h-16 text-gold mx-auto mb-6 animate-float" />
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-4">
              Not MIIAH's Birthday Yet!
            </h1>
            <p className="font-cormorant text-xl text-charcoal mb-8">
              This special opens only on July 19th 🎉
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm mb-8 border border-gold/20">
            <div className="flex items-center justify-center mb-8">
              <Gift className="w-8 h-8 text-gold mr-3" />
              <h3 className="font-playfair text-3xl font-semibold text-navy">
                Countdown to MIIAH's Day
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`text-center animate-slide-in-left`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-gold rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-2">
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center font-cormorant text-xl text-charcoal mt-8">
              Every moment brings us closer to celebrating you ✨
            </p>
          </div>

          <div className="bg-gradient-gold rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-navy mr-2" />
              <h3 className="font-playfair text-2xl font-semibold text-navy">
                Do You Know?
              </h3>
            </div>

            <div
              className={`transition-all duration-300 ${
                showFact ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <div className="text-4xl mb-4">
                {miiahFacts[currentFact].emoji}
              </div>
              <p className="font-cormorant text-lg text-navy mb-2">
                {miiahFacts[currentFact].fact}
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-white/50 rounded-full">
                <Star className="w-4 h-4 text-navy mr-1" />
                <span className="text-sm font-inter font-medium text-navy">
                  {miiahFacts[currentFact].category}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-cormorant text-lg text-charcoal mb-6">
              Come back on her special day to celebrate with her!
            </p>

            {/* test mode pre-birthday page */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleTestAccess}
                className="bg-gold/20 hover:bg-gold/30 text-charcoal border border-gold/30 px-6 py-3 rounded-xl text-sm"
              >
                🔧 Test Mode (Remove in Production)
              </Button>
              <Button
                onClick={() => setViewMode("post")}
                className="bg-cream hover:bg-cream/80 text-charcoal border border-gold/30 px-6 py-3 rounded-xl text-sm"
              >
                🔍 View Post-Birthday Page
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
