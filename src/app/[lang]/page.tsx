"use client";
import MySVG from "@/SVG/MySVG";
import { GraduationCap } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  // redirect('/login')
  const router = useRouter();
  const locale = useLocale();
  
  const [activePlan, setActivePlan] = useState("pro");
  const courses = [
    {
      title: "Frontend Development",
      level: "Beginner",
      rating: 4.8,
      instructor: "Ahmed Ali",
    },
    {
      title: "Backend with Node.js",
      level: "Intermediate",
      rating: 4.7,
      instructor: "Sara Mohamed",
    },
    {
      title: "UI/UX Design Basics",
      level: "Beginner",
      rating: 4.9,
      instructor: "Omar Hassan",
    },
  ];

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$0",
      features: ["Access free courses", "Community support"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$19",
      features: ["All courses", "Certificates", "Mentorship"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$39",
      features: ["Everything in Pro", "1-on-1 coaching", "Career support"],
    },
  ];
  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"} className="bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer text-white bg-linear-to-r from-blue-700 to-blue-500 px-3 py-1.5 rounded-2xl"
            onClick={() => { router.push('/dashboard') }}
            style={{
              background:
                "linear-gradient(90deg,#001a4d 0%,#003b9e 100%)",
            }}
          >
            <div className="w-15 bg-white/10 rounded-xl flex items-center justify-center">
              <GraduationCap size={32} 
                // className="text-[#1447e6]"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-wide text -blue-700">
                CENTER
              </h1>

              <p className="text-xs tracking-[3px] text -blue-700">
                EDUCATION
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="border-2 border-blue-800 text-blue-800 font-bold px-4 py-2 cursor-pointer hover:bg-blue-50 transition rounded-xl"
              onClick={() => { router.push('/login') }}
            >
              Login
            </button>
            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 cursor-pointer">
              Get Started
            </button> */}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Learn Skills That Build Your Future
          </h2>

          <p className="mt-4 text-slate-600">
            Join Center Education and access structured learning paths,
            expert instructors, and real-world projects.
          </p>

          <div className="mt-6 flex gap-3">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700">
              Start Learning Free
            </button>
            <button className="border px-5 py-3 rounded-xl">
              Browse Courses
            </button>
          </div>
        </div>

        <div className="bg-linear-to-br from-blue-100 to-blue-50 rounded-2xl h-72 flex items-center justify-center text-blue-600 font-semibold">
          Platform Preview
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 text-center">
          {[
            ["500+", "Courses"],
            ["100+", "Instructors"],
            ["50K+", "Students"],
            ["4.8", "Rating"],
          ].map(([num, label]) => (
            <div key={label}>
              <h3 className="text-2xl font-bold text-blue-700">{num}</h3>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-8">Popular Courses</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.title}
              className="bg-white rounded-2xl p-5 border hover:shadow-lg transition"
            >
              <div className="h-32 bg-slate-100 rounded-xl mb-4" />

              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-sm text-slate-500">
                Instructor: {course.instructor}
              </p>

              <div className="flex justify-between mt-3 text-sm">
                <span className="text-blue-600">{course.level}</span>
                <span>⭐ {course.rating}</span>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
                View Course
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-6 text-center">
          {[
            ["🎯", "Structured Learning"],
            ["💡", "Hands-on Projects"],
            ["🧑‍🏫", "Expert Mentors"],
            ["📈", "Career Growth"],
          ].map(([icon, title]) => (
            <div key={title} className="p-6 rounded-2xl border">
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-3 font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-8">What Students Say</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Amazing platform! I got my first job after completing courses.",
            "Very structured and easy to follow learning paths.",
            "Best academy for real-world skills.",
          ].map((text, i) => (
            <div key={i} className="bg-white border rounded-2xl p-5">
              <p className="text-slate-600">“{text}”</p>
              <div className="mt-4 text-sm font-semibold">Student {i + 1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Choose Your Plan
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`cursor-pointer border rounded-2xl p-6 transition ${activePlan === plan.id
                    ? "border-blue-600 shadow-lg"
                    : "bg-white"
                  }`}
              >
                <div className="flex flex-col h-56 .5 justify-between">
                  <div >
                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                    <p className="text-2xl font-bold text-blue-700 mt-2">
                      {plan.price}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {plan.features.map((f) => (
                        <li key={f}>✔ {f}</li>
                      ))}
                    </ul>
                  </div>
                
                  <button className="mt- 6 mt-auto w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
                    Select Plan
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h2 className="text-3xl font-bold">
          Start Your Learning Journey Today
        </h2>

        <p className="mt-3 text-blue-100">
          Join thousands of students already learning with us.
        </p>

        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100">
          Get Started Free
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <h3 className="font-bold text-blue-700">Center Education</h3>
            <p className="text-slate-500 mt-2">
              Learn. Build. Grow your future.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Platform</h4>
            <p>Courses</p>
            <p>Programs</p>
            <p>Pricing</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <p>Help Center</p>
            <p>Contact</p>
            <p>FAQ</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <p>Privacy Policy</p>
            <p>Terms</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
