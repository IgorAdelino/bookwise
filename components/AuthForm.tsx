'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { ZodType } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Props<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues: T,
  onSubmit: (data: T) => Promise<{success: boolean, error?: string}>
  type: 'SIGN_IN' | 'SIGN_UP'
}

const AuthForm =<T extends FieldValues>({type, schema, defaultValues, onSubmit}: Props<T>) => {
  const isSignIn = type === 'SIGN_IN'



  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  })
  
  const handleSubmit: SubmitHandler<T> = async(data: T) => {
    
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome back to BookWise': 'Create your library account'}
      </h1>
      <p className="text-light-200">
        {isSignIn ? 'Acces the vast collection of resouces, and stay updated' : 
        'Please complete all fields and upload a valid university ID to gain access to the library'}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? 'New to BookWise? ': 'Already have an account? '}
        <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="font-bold text-primary">
          {isSignIn ? 'Sign Up': 'Sign In'}
        </Link>
      </p>
    </div>

  )
}

export default AuthForm