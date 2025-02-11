'use client'
import AuthForm from '@/components/AuthForm'
import { signInSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm
    type='SIGN_IN'
    schema = {signInSchema}
    defaultValues={{
      email: '',
      password: '',
    }}
    onSubmit={async (data) => {
      return { success: true };
    }}
    />
  )
}

export default page