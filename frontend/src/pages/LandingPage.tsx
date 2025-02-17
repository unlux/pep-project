import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Search, Settings, Users } from "lucide-react";

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg";
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-slate-700 bg-transparent hover:bg-slate-800",
    ghost: "hover:bg-slate-800",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="container px-4 py-16 mx-auto">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-xl font-bold">QuestionPro</div>
          <NavLink to="/search">
            <Button variant="ghost" as={Link} to="/search">
              Go to Questions
            </Button>
          </NavLink>
        </nav>

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Streamline Your Question Management
          </h1>
          <p className="text-lg sm:text-xl text-slate-400">
            The intelligent platform for teachers to create, organize, and
            manage questions efficiently. Support for multiple question types
            and easy navigation.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-2 mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-slate-400">
              Quickly find questions with powerful search and filtering
              capabilities.
            </p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Types</h3>
            <p className="text-slate-400">
              Support for MCQ, Content-only, Read-along, and more question
              formats.
            </p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Built for Teachers</h3>
            <p className="text-slate-400">
              Designed specifically for educators to manage their question banks
              efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container px-4 py-16 mx-auto">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400">
              Join thousands of teachers who are already using our platform to
              manage their questions more effectively.
            </p>
            <nav>
              <NavLink to={"/search"}>
                <Button size="lg" as={Link} to="/search">
                  <span className="flex items-center gap-2">
                    Access Question Bank <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
