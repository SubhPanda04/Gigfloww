import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Bell, Eye, Users } from "lucide-react"
import Navbar from "@/components/Navbar/Navbar"
import { getJobs, createJob } from '@/services/hiringService';

export default function Hiring() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    role: "",
    skills: "",
    experience: "",
    employmentType: "",
    workplaceType: "",
    stipend: "",
    openings: "",
    description: "",
    links: "",
  })

  useEffect(() => {
    const loadJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    loadJobs();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAIWrite = () => {
    console.log("Opening AI writing assistant...")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createJob(formData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-hidden">
      <Navbar/>
      <main className="p-4 max-w-full">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Job Posting</h1>
            <p className="text-gray-600">Post Job for free. Add details for your job post.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 min-w-0">
              <div className="bg-white rounded-lg shadow-sm border p-6 overflow-hidden">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Fill in Job Details</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="role" className="text-gray-700 font-medium mb-2 block">
                      Role
                    </Label>
                    <Input
                      id="role"
                      placeholder="e.g UI/UX Designer"
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="skills" className="text-gray-700 font-medium mb-2 block">
                      Skill(s) Required
                    </Label>
                    <Select value={formData.skills} onValueChange={(value) => handleInputChange("skills", value)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Enter required skill(s)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                        <SelectItem value="frontend">Frontend Development</SelectItem>
                        <SelectItem value="backend">Backend Development</SelectItem>
                        <SelectItem value="fullstack">Full Stack Development</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-gray-700 font-medium mb-2 block">
                      Years of Experience/Experience Level
                    </Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => handleInputChange("experience", value)}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="e.g 0-2 years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="employmentType" className="text-gray-700 font-medium mb-2 block">
                      Employment Type
                    </Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => handleInputChange("employmentType", value)}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="e.g Full time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full time</SelectItem>
                        <SelectItem value="part-time">Part time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="workplaceType" className="text-gray-700 font-medium mb-2 block">
                      Workplace Type
                    </Label>
                    <Select
                      value={formData.workplaceType}
                      onValueChange={(value) => handleInputChange("workplaceType", value)}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="e.g Hybrid" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="stipend" className="text-gray-700 font-medium mb-2 block">
                      Stipend
                    </Label>
                    <Select value={formData.stipend} onValueChange={(value) => handleInputChange("stipend", value)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Enter the payment per month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                        <SelectItem value="20000-30000">₹20,000 - ₹30,000</SelectItem>
                        <SelectItem value="30000-50000">₹30,000 - ₹50,000</SelectItem>
                        <SelectItem value="50000+">₹50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="openings" className="text-gray-700 font-medium mb-2 block">
                      No of Opening (If it is more than 1 one)
                    </Label>
                    <Select value={formData.openings} onValueChange={(value) => handleInputChange("openings", value)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="e.g 2" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-700 font-medium mb-2 block">
                      Job Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter job description..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="rounded-lg min-h-32 resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="links" className="text-gray-700 font-medium mb-2 block">
                      Relevant Link(s)
                    </Label>
                    <Input
                      id="links"
                      placeholder="Enter link"
                      value={formData.links}
                      onChange={(e) => handleInputChange("links", e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg">
                    Post Job
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-6 min-w-0">
              <div className="bg-white rounded-lg shadow-sm border p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Manage Posting</h3>
                  <Button variant="link" className="text-blue-600 p-0 h-auto">
                    See all
                  </Button>
                </div>

                <div className="space-y-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">UI</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">UI Designer Intern (Remote)</h4>
                          <p className="text-xs text-gray-500 mb-2 truncate">Bangalore, India</p>
                          <p className="text-xs text-gray-500 mb-3 truncate">Posted 2 days ago, Expires 12-02-24</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-gray-500">
                              <Eye className="h-3 w-3 flex-shrink-0" />
                              <span>3k</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Users className="h-3 w-3 flex-shrink-0" />
                              <span>Applications</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">UI</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">UI Designer Intern (Remote)</h4>
                          <p className="text-xs text-gray-500 mb-2 truncate">Bangalore, India</p>
                          <p className="text-xs text-gray-500 mb-3 truncate">Posted 2 days ago, Expires 12-02-24</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-gray-500">
                              <Eye className="h-3 w-3 flex-shrink-0" />
                              <span>3k</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Users className="h-3 w-3 flex-shrink-0" />
                              <span>Applications</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6 overflow-hidden">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">👤</span>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🤖</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Use AI to write</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Tell AI what you want and let it you want help with job descriptions and other fields. AI will
                    suggest for you.
                  </p>
                  <Button onClick={handleAIWrite} className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg">
                    Write with AI
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}