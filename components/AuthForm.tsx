'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
} from "@/components/ui/form"
import CustomFormField from './CustomFormField'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'


const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      // Sign Up with App and create a plaid link 
      if (type === 'sign-up') {
        const newUser = await signUp(data)
        setUser(newUser)
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password
        })

        if (response) router.push("/")
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='auth-form'>
      <header className='vertical-stack gap-5 md:gap-8'>
        <Link
          href='/'
          className='flex cursor-pointer items-center gap-1'
        >
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='Horizon Logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
            Horizon
          </h1>
        </Link>

        <div className='vertical-stack gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className='text-16 font-normal text-gray-600'>
              {user ? 'Link your account to get started' : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='vertical-stack gap-4'>
          {/* PLAID LINK */}
        </div>
      ) : <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === 'sign-up' && (
              <>
                <div className='horizontal-stack gap-4'>
                  <CustomFormField
                    control={form.control}
                    label='First Name'
                    name='firstName'
                    placeholder='Enter your name'
                  />
                  <CustomFormField
                    control={form.control}
                    label='Surname'
                    name='lastName'
                    placeholder='Enter your surname'
                  />
                </div>
                <CustomFormField
                  control={form.control}
                  label='Address'
                  name='address1'
                  placeholder='Enter your address'
                />
                <CustomFormField
                  control={form.control}
                  label='City'
                  name='city'
                  placeholder='Enter your city'
                />
                <div className='horizontal-stack gap-4'>
                  <CustomFormField
                    control={form.control}
                    label='State'
                    name='state'
                    placeholder='ex. NY'
                  />
                  <CustomFormField
                    control={form.control}
                    label='Postal Code'
                    name='postalCode'
                    placeholder='ex. 11101'
                  />
                </div>
                <div className='horizontal-stack gap-4'>
                  <CustomFormField
                    control={form.control}
                    label='Date of Birth'
                    name='dateOfBirth'
                    placeholder='YYYY-MM-DD'
                  />
                  <CustomFormField
                    control={form.control}
                    label='SSN'
                    name='ssn'
                    placeholder='ex. 1234'
                  />
                </div>
              </>
            )}
            <CustomFormField
              control={form.control}
              label='Email'
              name='email'
              placeholder='Enter your email'
            />
            <CustomFormField
              control={form.control}
              label='Password'
              name='password'
              placeholder='Enter your password'
            />
            <div className='vertical-stack gap-4'>
              <Button type="submit" className='form-btn' disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className='animate-spin' /> &nbsp; Loading...
                  </>) : type === 'sign-in' ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </form>
        </Form>
        <footer className='flex justify-center gap-1'>
          <p className='text-14 font-normal text-gray-600'>
            {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </footer>
      </>}
    </section>
  )
}

export default AuthForm
