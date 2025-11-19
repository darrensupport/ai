'use client';

import { useRouter } from 'next/navigation';
import { PlusIcon, SidebarLeftIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { closeArtifact, useArtifact } from '@/hooks/use-artifact';

export function LayoutHeader() {
  const { state, toggleSidebar, openMobile } = useSidebar();
  const router = useRouter();
  const { setArtifact, artifact, metadata } = useArtifact();

  // Don't show the component when sidebar is expanded (desktop) or open (mobile/tablet) or browser artifact is in fullscreen mode
  if (state === 'expanded' || openMobile || (artifact.kind === 'browser' && metadata?.isFullscreen)) {
    return null;
  }

  const handleNewChat = () => {
    closeArtifact(setArtifact);
    router.push('/');
    router.refresh();
  };

  return (
    <>
      {/* Mobile/Tablet: Just the toggle button at the top */}
      <div className="lg:hidden fixed left-4 top-4 z-[100]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="sidebar-toggle-button"
              onClick={toggleSidebar}
              variant="outline"
              className="size-10 p-0 bg-background border-sidebar-border hover:bg-custom-purple/20 shadow-md"
            >
              <SidebarLeftIcon size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="start" side="right" sideOffset={8}>
            Toggle Sidebar
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Desktop: Full sidebar strip with both buttons */}
      <div className="hidden lg:flex fixed left-0 top-0 w-[50px] h-screen bg-sidebar flex-col items-center py-4 gap-4 z-[100]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="sidebar-toggle-button"
              onClick={toggleSidebar}
              variant="outline"
              className="size-8 p-0 bg-background border-sidebar-border hover:bg-custom-purple/20"
            >
              <SidebarLeftIcon size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="start" side="right" sideOffset={8}>
            Toggle Sidebar
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleNewChat}
              variant="outline"
              className="size-8 p-0 bg-background border-sidebar-border hover:bg-custom-purple/20"
            >
              <PlusIcon size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="start" side="right" sideOffset={8}>
            New Chat
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}
