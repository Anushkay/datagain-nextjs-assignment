import { SidebarItemProps } from "./types";
import AccountsIcon from "@/app/icons/AccountsIcon";
import BatchesIcon from "@/app/icons/BatchesIcon";
import ResolutionIcon from "@/app/icons/ResolutionIcon";
import AssesmentsIcon from "@/app/icons/AssesmentsIcon";
import AppealLetterIcon from "@/app/icons/AppealLetterIcon";
import SummaryIcon from "@/app/icons/SummaryIcon";
import SettingsIcon from "@/app/icons/SettingsIcon";
import DashboardIcon from "@/app/icons/DashboardIcon";

// Sidebar item configuration
export const sidebarItems: SidebarItemProps[] = [
  {
    path: '/',
    label: 'Dashboard',
    isActive: false,
    iconProps: {
      icon: DashboardIcon,
      size: 20,
      tooltip: 'Dashboard',
    }
  },
  {
    path: '/accounts',
    label: 'Accounts',
    isActive: false,
    iconProps: {
      icon: AccountsIcon,
      size: 20,
      tooltip: 'Accounts',
  
    }
  },
  {
    path: '/batches',
    label: 'Batches',
    isActive: false,
    iconProps: {
      icon: BatchesIcon,     
      size: 20,
      tooltip: 'Batches', 
    }
  },
  {
    path: '/resolution',
    label: 'Resolution',
    isActive: false,
    iconProps: {  
      icon: ResolutionIcon,
      size: 20,
      tooltip: 'Resolution',
    }
  },
  {
    path: '/assessments',
    label: 'Assessments',
    isActive: false,
    iconProps: {    
      icon: AssesmentsIcon,
      size: 20,
      tooltip: 'Assessments',
    }
  },
  {
    path: '/appeal-letter',
    label: 'Appeal Letter',
    isActive: false,
    iconProps: {
      icon: AppealLetterIcon,
      size: 20,
      tooltip: 'Appeal Letter',
    }
  },
  {
    path: '/summary',
    label: 'Summary',
    isActive: false,
    iconProps: {  
      icon: SummaryIcon,
      size: 20,
      tooltip: 'Summary',
    }
  },
   {
    path: '/scheduler',
    label: 'Scheduler',
    isActive: false,
    iconProps: {  
      icon: SummaryIcon,
      size: 20,
      tooltip: 'Scheduler',
    }
  },
];

// Footer item configuration
export const footerItems: SidebarItemProps[] = [
  {
    path: '/settings',
    label: 'Settings',
    isActive: false,
    iconProps: {
      icon: SettingsIcon,
      size: 20,
      tooltip: 'Settings',
    }
  },
];