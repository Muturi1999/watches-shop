"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Save, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface HeroSection {
  title: string
  subtitle: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundImage: string
}

export default function HeroManagementPage() {
  const [heroData, setHeroData] = useState<HeroSection>({
    title: 'Timeless Elegance',
    subtitle: 'Premium Executive Watches',
    description: 'Discover our exclusive collection of luxury timepieces crafted for those who appreciate fine artistry',
    primaryButtonText: 'Shop Now',
    primaryButtonLink: '/shop',
    secondaryButtonText: 'View Collection',
    secondaryButtonLink: '/collection',
    backgroundImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200'
  })
  const { toast } = useToast()

  useEffect(() => {
    loadHeroData()
  }, [])

  const loadHeroData = () => {
    const stored = localStorage.getItem('admin_hero')
    if (stored) {
      setHeroData(JSON.parse(stored))
    }
  }

  const handleSave = () => {
    localStorage.setItem('admin_hero', JSON.stringify(heroData))
    toast({ title: 'Hero section updated successfully!' })
  }

  const handleChange = (field: keyof HeroSection, value: string) => {
    setHeroData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Hero Section</h1>
        <p className="text-muted-foreground">Customize the homepage hero section content and imagery</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Content</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={heroData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Main heading"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={heroData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Subheading"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={heroData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Hero description"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="backgroundImage">Background Image URL</Label>
              <Input
                id="backgroundImage"
                value={heroData.backgroundImage}
                onChange={(e) => handleChange('backgroundImage', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Primary Button</h3>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="primaryButtonText">Text</Label>
                  <Input
                    id="primaryButtonText"
                    value={heroData.primaryButtonText}
                    onChange={(e) => handleChange('primaryButtonText', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="primaryButtonLink">Link</Label>
                  <Input
                    id="primaryButtonLink"
                    value={heroData.primaryButtonLink}
                    onChange={(e) => handleChange('primaryButtonLink', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Secondary Button</h3>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="secondaryButtonText">Text</Label>
                  <Input
                    id="secondaryButtonText"
                    value={heroData.secondaryButtonText}
                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryButtonLink">Link</Label>
                  <Input
                    id="secondaryButtonLink"
                    value={heroData.secondaryButtonLink}
                    onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
            <Image
              src={heroData.backgroundImage}
              alt="Hero background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
              <div className="text-center text-white max-w-2xl">
                <p className="text-sm uppercase tracking-wide mb-2">{heroData.subtitle}</p>
                <h1 className="text-4xl font-bold mb-4">{heroData.title}</h1>
                <p className="text-lg mb-6 opacity-90">{heroData.description}</p>
                <div className="flex gap-3 justify-center">
                  <button className="px-6 py-3 bg-white text-black rounded-md font-semibold">
                    {heroData.primaryButtonText}
                  </button>
                  <button className="px-6 py-3 border-2 border-white text-white rounded-md font-semibold">
                    {heroData.secondaryButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
