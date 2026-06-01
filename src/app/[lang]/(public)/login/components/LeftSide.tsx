import { BookOpen, GraduationCap, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function LeftSide() {
  const t = useTranslations();
  const router = useRouter();
  
  return (
    <React.Fragment>
      <div
        className="lg:w-[35%] text-white p-12 flex flex-col justify-between"
        style={{
          background:
            "linear-gradient(180deg,#001a4d 0%,#003b9e 100%)",
        }}
      >
        <div>
          <div className="flex items-center gap-4 mb-8 cursor-pointer"
            onClick={() => { router.push('/') }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
              <GraduationCap size={36} />
            </div>

            <div>
              <h1 className="text-5xl font-bold tracking-wide">
                CENTER
              </h1>

              <p className="text-xl tracking-[8px]">
                EDUCATION
              </p>
            </div>
          </div>

          <div className="w-16 h-1 bg-blue-400 mb-4" />

          <h3 className="text-4xl font-bold leading-tight mb-8">
            {t("login.Learn_Today")},
            <br />
            <span className="text-blue-400 me-2.5 ">
              {t("login.Lead")}
            </span>
            {t("login.Tomorrow")}.
          </h3>

          <p className="text-xl text-gray-300 max-w-md">
            {t("login.Center_Academy_Description")}
          </p>
        </div>

        <div className="space-y-7 mt-10">
          <Feature
            icon={<GraduationCap />}
            title={t("login.Expert_Instructors")}
            desc={t("login.Expert_Instructors_Description")}
          />

          <Feature
            icon={<BookOpen />}
            title={t("login.Quality_Courses")}
            desc={t("login.Quality_Courses_Description")}
          />

          <Feature
            icon={<Trophy />}
            title={t("login.Achieve_Your_Goals")}
            desc={t("login.Achieve_Your_Goals_Description")}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-14 h-14 rounded-full bg-blue-600/30 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-lg">
          {title}
        </h4>

        <p className="text-gray-300 text-sm max-w-xs">
          {desc}
        </p>
      </div>
    </div>
  );
}