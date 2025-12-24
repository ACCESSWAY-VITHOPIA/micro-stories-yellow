import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Play, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation - email already exists
          toast.info("You're already on the waitlist!");
          setIsSubscribed(true);
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast.success("You're on the list! We'll notify you when we launch.");
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large glowing orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        
        {/* Floating accent circles */}
        <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-primary/60 animate-float" />
        <div className="absolute top-40 right-32 w-3 h-3 rounded-full bg-accent/50 animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-gold-light/40 animate-float" />
        <div className="absolute bottom-60 right-1/4 w-5 h-5 rounded-full bg-primary/30 animate-float-delayed" />
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 w-px h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-1/3 w-px h-32 bg-gradient-to-t from-transparent via-primary/10 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* Logo / Brand */}
        <div className="mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 glow-gold-subtle">
              <Play className="w-6 h-6 text-primary fill-primary" />
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="text-gradient-gold">Micro</span>
          <span className="text-foreground">Kahani</span>
        </h1>

        {/* Tagline */}
        <p 
          className="text-xl md:text-2xl text-muted-foreground font-light text-center mb-2 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Reel-sized dramas. Endless emotions.
        </p>

        {/* Coming Soon badge */}
        <div 
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Launching Soon</span>
        </div>

        {/* Description */}
        <p 
          className="max-w-lg text-center text-muted-foreground mb-10 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Experience captivating stories in minutes, not hours. 
          Swipe through premium micro-dramas crafted for the moments between moments.
        </p>

        {/* Email signup form */}
        <div 
          className="w-full max-w-md opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 px-5 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 rounded-xl"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Joining...
                    </span>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground text-center">
                Be the first to know. No spam, ever.
              </p>
            </form>
          ) : (
            <div className="text-center p-6 rounded-2xl bg-primary/10 border border-primary/20 glow-gold-subtle">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-lg font-medium text-foreground mb-1">You're on the list!</p>
              <p className="text-sm text-muted-foreground">We'll send you an exclusive invite when we launch.</p>
            </div>
          )}
        </div>

        {/* Bottom decorative element */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-primary/60" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Index;
