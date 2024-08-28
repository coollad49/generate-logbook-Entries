'use client'
import { Format } from '@/components/modified-card';
import { UserContext } from '@/context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Loader from "@/components/loader";

export default function Home() {
  // Use useContext to get the user object from UserContext
  const { user } = UserContext(); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (!user) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-white h-screen relative">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center text-white h-screen relative">
      <Format />
    </div>
  );
}
