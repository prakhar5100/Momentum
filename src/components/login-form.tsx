import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export type LoginChildProps = React.ComponentPropsWithoutRef<"div"> & {
  method : string,
  handleChange : (event : React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit : () => void
}

export function LoginForm({
  method,
  className,
  handleChange,
  handleSubmit,
  ...props
}: LoginChildProps) {
  return (
    <div className={cn("flex flex-col gap-6 font-poppins", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

        {
            method == "register" && 
            <div className="bg-white relative hidden md:block">
            <img
              src="/images/task.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          }

          <form className="p-6 md:p-8" onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-bold">{
                method == "login" ? 
                "Welcome back" : "Register Your Account"}</h1>
                <p className="text-muted-foreground text-balance text-base">
                  {
                    method == "login" ? `Login to your Momentum account` : `Register your Momentum account`
                  }
        
                </p>
              </div>

                <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="John Doe"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => handleChange(e)}

                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                  {
                    method == "login" &&                   
                    <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                  }

                </div>
                <Input id="password" type="password" required onChange={(e) => handleChange(e)}
                />
              </div>
              <Button type="submit" className="w-full">
                {
                  method == "register" ? "Register" : "Login"
                }
              </Button>
        
              <div className="text-center text-sm">

                { method == "login" ? "Don't have an account? " : 'Already have an account? '}
                <Link to={method == "login" ? '/register' : '/login'} className="underline underline-offset-4">
                  {method == "login" ? 'Register' : "Login"}
                </Link>
              </div>
            </div>
          </form>
          {
            method == "login" && 
            <div className="bg-white relative hidden md:block">
            <img
              src="/images/task.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          }
         
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
