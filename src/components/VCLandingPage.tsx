import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Target, Brain, Shield, Users, Award, ArrowRight, CheckCircle, Zap } from "lucide-react";
import heroImage from "@/assets/hero-investor-overwhelmed.jpg";

export const VCLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="deal-flow absolute inset-0 opacity-20"></div>
        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up">
              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">673 Pitch Decks This Quarter.</span>
                <br />
                <span className="text-gold-primary">156 Hours to Properly Evaluate Them.</span>
                <br />
                <span className="text-white">You Have 47.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                The next billion-dollar company is buried in your deal flow. You're missing it because you're drowning in opportunities instead of systematically identifying winners.
              </p>
              
              <div className="bg-navy-medium/30 backdrop-blur-sm border border-gold-primary/30 rounded-lg p-6">
                <p className="text-gold-primary font-semibold text-lg mb-2">Investment Reality Check:</p>
                <p className="text-gray-200">
                  When did finding exceptional investment opportunities become surviving the deal flow tsunami instead of strategic portfolio construction and thesis execution?
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" className="group">
                  Optimize Investment Intelligence
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline_premium" size="xl">
                  View Success Stories
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Solo investor overwhelmed by deal flow"
                className="rounded-2xl shadow-investment animate-float"
              />
              <div className="absolute -top-4 -right-4 bg-gold-primary text-navy-deep px-4 py-2 rounded-lg font-bold shadow-gold">
                🎯 673 Opportunities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Agitation Section */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              The VC of One FOMO That's Costing You 
              <span className="text-gold-primary"> Generational Returns</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Investment overwhelm pain points with deal evaluation anxiety
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Every 'Pass' Could Be The Next Airbnb",
                description: "Every 'pass' decision could be the next Airbnb, Stripe, or Notion that you didn't have adequate time to properly evaluate and understand"
              },
              {
                icon: TrendingUp,
                title: "Due Diligence Under Pressure", 
                description: "Due diligence processes that should involve 2-3 weeks of thorough analysis get compressed into 2-hour gut decisions because your pipeline never stops flowing"
              },
              {
                icon: Brain,
                title: "Portfolio Neglect",
                description: "Existing portfolio companies desperately need your strategic guidance and value-add support, but new investment opportunities keep demanding immediate evaluation attention"
              },
              {
                icon: Users,
                title: "David vs Goliath Competition",
                description: "You're competing against institutional VCs with teams of 15+ analysts while you're making high-stakes investment decisions in isolation with limited bandwidth"
              },
              {
                icon: Zap,
                title: "Market Timing Windows",
                description: "Market timing windows for hot sectors close rapidly while you're still trying to complete basic evaluation on opportunities from weeks ago"
              },
              {
                icon: Shield,
                title: "Isolation Amplifies Risk",
                description: "Solo investors evaluate 78% fewer deals thoroughly compared to institutional funds. Missed investment opportunities due to evaluation bandwidth constraints cost independent investors an average of $2.3M in potential returns annually"
              }
            ].map((pain, index) => (
              <Card key={index} className="bg-gradient-card border-gold-primary/20 p-6 hover:border-gold-primary/40 transition-premium">
                <pain.icon className="w-12 h-12 text-gold-primary mb-4" />
                <h3 className="font-display text-xl font-semibold text-white mb-3">{pain.title}</h3>
                <p className="text-gray-300">{pain.description}</p>
              </Card>
            ))}
          </div>
          
          <div className="bg-navy-deep/50 backdrop-blur-sm border border-gold-primary rounded-2xl p-8 text-center">
            <p className="text-2xl font-semibold text-gold-primary mb-4">
              "You're not slow at investment evaluation. You're not missing obvious signals."
            </p>
            <p className="text-xl text-gray-200">
              You're one person trying to perform institutional-level due diligence on exponentially growing deal flow.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-navy-deep">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              Invest Like You Have a Team of 
              <span className="text-gold-primary"> Senior Investment Partners</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Investment AI capabilities with sophisticated deal evaluation and portfolio intelligence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  {
                    title: "Deal Sourcing Intelligence AI",
                    description: "Surface exceptional opportunities from noise using advanced pattern recognition across founder profiles, market dynamics, business model validation, and competitive positioning"
                  },
                  {
                    title: "Due Diligence Acceleration AI", 
                    description: "Comprehensive investment analysis in days, not weeks - financial modeling, market sizing, competitive landscape analysis, team assessment, and risk evaluation with institutional-grade depth"
                  },
                  {
                    title: "Portfolio Intelligence Management AI",
                    description: "Monitor existing investments automatically with performance tracking, early warning systems, strategic recommendation engines, and value-add opportunity identification"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-gold-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gold-primary/10 border border-gold-primary rounded-lg p-6">
                <p className="text-gold-primary font-semibold text-lg">
                  Investment Transformation Promise:
                </p>
                <p className="text-white mt-2">
                  Stop missing opportunities due to evaluation bandwidth. Start making investment decisions with institutional-level intelligence and analysis depth while maintaining your agility advantage.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-card rounded-2xl p-8 shadow-investment">
              <h3 className="font-display text-2xl font-bold text-white mb-6">Investment Intelligence Dashboard</h3>
              <div className="space-y-4">
                <div className="bg-navy-deep/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Deal Flow Analysis</span>
                    <span className="text-gold-primary font-semibold">94% Accuracy</span>
                  </div>
                  <div className="bg-navy-deep rounded-full h-2">
                    <div className="bg-gold-primary h-2 rounded-full w-[94%]"></div>
                  </div>
                </div>
                <div className="bg-navy-deep/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Portfolio Performance</span>
                    <span className="text-gold-primary font-semibold">52% IRR</span>
                  </div>
                  <div className="bg-navy-deep rounded-full h-2">
                    <div className="bg-gold-primary h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              Independent Investors Generating Alpha with 
              <span className="text-gold-primary"> AI-Enhanced Deal Analysis</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Patricia Zhang",
                role: "Former Google Executive & Angel Investor",
                quote: "Identified unicorn opportunity at seed stage using AI pattern recognition that I would have missed in traditional deal screening - 47x return in 4 years",
                metric: "47x Return"
              },
              {
                name: "Marcus Johnson", 
                role: "Independent VC Fund Manager",
                quote: "Portfolio IRR increased from 23% to 52% through AI-enhanced company selection and strategic timing optimization",
                metric: "52% IRR"
              },
              {
                name: "Elena Rodriguez",
                role: "Solo Investment Partner", 
                quote: "Reduced due diligence time from 8 weeks to 12 days without sacrificing investment quality - closed 3 deals that competitors missed due to speed",
                metric: "12 Days DD"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gradient-card border-gold-primary/20 p-6">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gold-primary mb-2">{testimonial.metric}</div>
                  <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gold-primary text-sm">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="py-20 bg-navy-deep" id="optimize-form">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              Optimize Your <span className="text-gold-primary">Investment Decision Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300">
              Investment strategy assessment and AI-enhanced portfolio construction with someone who understands the isolation and complexity of independent investment decision-making
            </p>
          </div>
          
          <Card className="bg-gradient-card border-gold-primary p-8 shadow-investment">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input id="name" placeholder="Enter your full name" className="bg-navy-deep/50 border-gold-primary/30 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Investment Email *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-navy-deep/50 border-gold-primary/30 text-white" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="entity" className="text-white">Investment Entity Name</Label>
                  <Input id="entity" placeholder="Fund or entity name" className="bg-navy-deep/50 border-gold-primary/30 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classification" className="text-white">Investor Classification</Label>
                  <Select>
                    <SelectTrigger className="bg-navy-deep/50 border-gold-primary/30 text-white">
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="angel">Accredited Angel Investor</SelectItem>
                      <SelectItem value="solo-vc">Solo VC Fund Manager</SelectItem>
                      <SelectItem value="family-office">Family Office Investment Professional</SelectItem>
                      <SelectItem value="advisor">Independent Investment Advisor</SelectItem>
                      <SelectItem value="corporate">Corporate Venture Partner</SelectItem>
                      <SelectItem value="committee">Investment Committee Member</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Primary Investment Challenges</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Deal sourcing and quality pipeline",
                    "Due diligence depth and efficiency", 
                    "Portfolio management and value-add",
                    "Market research and competitive analysis",
                    "Exit timing and strategic positioning",
                    "Network access and co-investment opportunities"
                  ].map((challenge) => (
                    <div key={challenge} className="flex items-center space-x-2">
                      <Checkbox id={challenge} className="border-gold-primary" />
                      <Label htmlFor={challenge} className="text-gray-300 text-sm">{challenge}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vision" className="text-white">Investment Success Vision</Label>
                <Textarea 
                  id="vision" 
                  placeholder="What would investment excellence look like with unlimited evaluation bandwidth and institutional-level analysis capabilities?"
                  className="bg-navy-deep/50 border-gold-primary/30 text-white h-24"
                />
              </div>
              
              <Button variant="investment" size="xl" className="w-full">
                Optimize Investment Intelligence
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-sm text-gray-400 text-center">
                Your investment strategy, deal flow information, portfolio details, and competitive positioning remain completely confidential under institutional-grade professional discretion and security standards
              </p>
            </form>
          </Card>
          
          <div className="mt-12 text-center space-y-4">
            <div className="text-gold-primary font-semibold">🎯 Only 4 investment intelligence consultations available this week</div>
            <div className="text-gray-300">Market cycles don't wait for adequate due diligence - analytical capability improvements compound over time</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-navy-deep border-t border-gold-primary/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-gold-primary font-bold text-xl mb-4">Powered by Utlyze</div>
            <div className="text-gray-400 text-sm">
              Join 450+ investment professionals generating alpha through AI-enhanced investment intelligence and systematic deal evaluation
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};