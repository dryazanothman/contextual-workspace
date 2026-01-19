import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket, Users, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates and shared workspaces.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and compliance standards.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description: 'Built with Next.js 14 for optimal performance and instant page loads.',
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Scalable Architecture',
      description: 'Grows with your team from startup to enterprise scale.',
    },
  ]

  const benefits = [
    'Real-time collaboration',
    'Unlimited workspaces',
    'Advanced permissions',
    'Custom integrations',
    '24/7 support',
    '99.9% uptime SLA',
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Rocket className="mr-2 h-4 w-4" />
            Now with Next.js 14 & App Router
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Modern Workspace for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Productive Teams
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
            Contextual Workspace brings your team together with powerful collaboration tools,
            seamless integrations, and enterprise-grade security—all in one beautiful interface.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <Link href="/auth/signin">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg" asChild>
              <Link href="#features">
                View Features
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything your team needs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built with the modern web stack for maximum performance and developer experience.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-transparent hover:border-blue-200 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Why choose Contextual Workspace?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Join thousands of teams who have transformed their workflow with our platform.
              </p>
              <div className="mt-8">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <Link href="/auth/signin">
                    Start Free Trial
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
                  <span className="text-lg text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Ready to transform your team&apos;s workflow?
              </CardTitle>
              <CardDescription className="text-xl text-gray-600">
                Join thousands of productive teams already using Contextual Workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="px-10 py-6 text-lg" asChild>
                  <Link href="/auth/signin">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10 py-6 text-lg" asChild>
                  <Link href="https://github.com/yksanjo/contextual-workspace" target="_blank">
                    View on GitHub
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
              <span className="ml-3 text-xl font-bold text-gray-900">Contextual Workspace</span>
            </div>
            <div className="text-center text-sm text-gray-500 md:text-right">
              <p>© {new Date().getFullYear()} Contextual Workspace. All rights reserved.</p>
              <p className="mt-2">
                Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Prisma.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}