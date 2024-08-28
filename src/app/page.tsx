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
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

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
