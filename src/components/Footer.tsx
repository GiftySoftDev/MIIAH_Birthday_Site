import React from "react";
import { Heart, Sparkles, Scissors, Palette } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Scissors className="w-8 h-8 text-gold" />
            <h3 className="font-playfair text-3xl md:text-4xl font-bold">
              Made with Love
            </h3>
            <Palette className="w-8 h-8 text-gold" />
          </div>

          <p className="font-cormorant text-xl md:text-2xl text-cream/90 mb-8 max-w-3xl mx-auto">
            A special birthday celebration crafted for an extraordinary
            designer, surprise vendor and friend. May this day be as beautiful
            and timeless as your creations.
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center sm:space-x-6 space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gold" />
              <span className="font-inter text-cream/80">Fashion</span>
            </div>
            <div className="w-px h-6 bg-gold/50"></div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-inter text-cream/80">Creativity</span>
            </div>
            <div className="w-px h-6 bg-gold/50"></div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gold" />
              <span className="font-inter text-cream/80">Friendship</span>
            </div>
          </div>
        </div>

        {/* Birthday Message */}
        <div className="bg-gold/10 rounded-3xl p-8 mb-12 border border-gold/20">
          <div className="text-center">
            <h4 className="font-playfair text-2xl font-semibold text-gold mb-4">
              🎉 Happy Birthday, Mama! 🎉
            </h4>
            <p className="font-cormorant text-lg text-cream/90 max-w-2xl mx-auto">
              Thank you for being an inspiration. Your creativity lights up
              every room and your friendship means the world to us.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gold/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-cream/70 text-center md:text-left">
              © {currentYear} • Crafted with ❤️ for a Special Birthday by{" "}
                  <a href="https://websitetoscale.com" target="_blank"   rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">
        Gifty
        </a>—MIIAH's bossom friend.
              
            </p>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-inter text-cream/70 text-sm">
                Celebrating July 19th with Style
              </span>
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 opacity-20">
          <div className="animate-float">
            <Heart className="w-6 h-6 text-gold" />
          </div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <div className="animate-float" style={{ animationDelay: "1s" }}>
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
