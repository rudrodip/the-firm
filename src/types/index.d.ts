export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  creator: { name: string, url: string }
  keywords: string[]
  links: {
    twitter: string
    github: string
  }
}

export type gpt = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  authorId: string;
};
