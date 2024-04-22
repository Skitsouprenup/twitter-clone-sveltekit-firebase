import { Home, Search, Bell, List, Mail, ArrowBigLeft, UsersRound } from "lucide-svelte";

export const sidebarSelection = [
  {
    id: 1,
    icon: Home,
    label: 'Home',
    href: '/'
  },
  {
    id: 2,
    icon: Search,
    label: 'Explorer',
    href: '/'
  },
  {
    id: 3,
    icon: Bell,
    label: 'Notification',
    href: '/'
  },
  {
    id: 4,
    icon: Mail,
    label: 'Messages',
    href: '/'
  },
  {
    id: 5,
    icon: List,
    label: 'List',
    href: '/'
  },
  {
    id: 6,
    icon: UsersRound,
    label: 'Communities',
    href: '/'
  },
  {
    id: 7,
    icon: ArrowBigLeft,
    label: 'Logout',
    href: '/login'
  },
  
]