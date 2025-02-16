import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Zap, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/themeToggle';
import { useEffect } from 'react';



export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token ", token)
    if (token) {
      navigate('/chat');
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Echo Chat</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Experience Real-Time
              <span className="text-primary block">Echo Chat</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Send messages and watch them bounce back instantly. A perfect playground
              for testing real-time communication with WebSocket technology.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => navigate('/signup')}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Try Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-3xl blur-3xl" />
            <div className="border rounded-2xl shadow-2xl bg-card">
              <div className="border-b p-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 bg-muted p-4 rounded-2xl">
                    Hello, how are you?
                  </div>
                </div>
                <div className="flex gap-4 items-start flex-row-reverse">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 bg-primary p-4 rounded-2xl text-primary-foreground">
                    Hello, how are you?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Echo Chat?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-8 w-8" />,
              title: 'Real-Time Echo',
              description:
                'Experience instant message echoing with WebSocket technology.',
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: 'Secure Communication',
              description:
                'Your messages are protected with industry-standard security.',
            },
            {
              icon: <Smartphone className="h-8 w-8" />,
              title: 'Responsive Design',
              description:
                'Access Echo Chat seamlessly across all your devices.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="bg-primary/10 w-fit p-3 rounded-xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
          <div className="relative p-12 md:p-24 text-primary-foreground text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Chatting?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join Echo Chat today and experience the power of real-time communication.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/signup')}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-semibold">Echo Chat</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Echo Chat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}