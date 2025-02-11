'use client'
import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        fullName: '',
        email: '',
        universityId: 0,
        universityCard: '',
        password: '',
      }}
      onSubmit={async (data) => {
        return { success: true };
      }}
    />
  );
};

export default page