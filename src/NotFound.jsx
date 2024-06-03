import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default function () {
  return (
    <div class="text-center flex flex-col justify-center h-screen">
        <h1 class="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p class="mb-4 text-lg text-gray-600">Page tidak ditemukan.</p>
        <div class="animate-bounce">
            <svg class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
        </div>
        <p class="mt-4 text-gray-600">ayo kemabali ke <NavLink to={"/"} className="text-blue-500 underline">rumah</NavLink>.</p>
    </div>
  )
}
