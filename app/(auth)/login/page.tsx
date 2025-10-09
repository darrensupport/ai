'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '@/components/toast';
import { useSession } from 'next-auth/react';
import { MicrosoftLogo } from '@/components/icons/MicrosoftLogo';
import { GoogleLogo } from '@/components/icons/GoogleLogo';

export default function Page() {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleMockLogin = async (provider: 'microsoft' | 'google') => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Mock successful login
      toast({
        type: 'success',
        description: `Successfully signed in with ${provider === 'microsoft' ? 'Microsoft' : 'Google'}!`,
      });
      
      // Update session and redirect
      await updateSession();
      router.push('/');
    } catch (error) {
      toast({
        type: 'error',
        description: `Failed to sign in with ${provider === 'microsoft' ? 'Microsoft' : 'Google'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f5e9f2] relative size-full min-h-screen">
      <div className="absolute bg-white border border-neutral-200 border-solid h-[260px] left-1/2 rounded-[10px] top-[257px] translate-x-[-50%] w-[414px]">
        <div className="absolute content-stretch flex flex-col gap-[18px] h-[42px] items-center left-[32px] top-[32px] w-[350px]">
          <p className="font-['Freight:Text_Medium',_sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[32px] text-center text-neutral-900 tracking-[0.16px]">
            Welcome
          </p>
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[14px] text-center text-neutral-900 tracking-[0.07px]">
            Sign in to access the Application Assistant
          </p>
          
          {/* Microsoft Login Button */}
          <button
            onClick={() => handleMockLogin('microsoft')}
            disabled={isLoading}
            className="border border-neutral-200 border-solid box-border content-stretch flex gap-[8px] items-center justify-center min-h-[36px] px-[16px] py-[7.5px] relative rounded-[8px] shrink-0 w-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <div className="relative shrink-0 size-[13.25px]">
              <MicrosoftLogo size={13.25} className="block max-w-none size-full" />
            </div>
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap">
              <p className="leading-[14px] whitespace-pre">
                {isLoading ? 'Signing in...' : 'Continue with Microsoft'}
              </p>
            </div>
          </button>

          {/* Google Login Button */}
          <button
            onClick={() => handleMockLogin('google')}
            disabled={isLoading}
            className="border border-neutral-200 border-solid box-border content-stretch flex gap-[8px] items-center justify-center min-h-[36px] px-[16px] py-[7.5px] relative rounded-[8px] shrink-0 w-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <div className="relative shrink-0 size-[13.25px]">
              <GoogleLogo size={13.25} className="block max-w-none size-full" />
            </div>
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap">
              <p className="leading-[14px] whitespace-pre">
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
