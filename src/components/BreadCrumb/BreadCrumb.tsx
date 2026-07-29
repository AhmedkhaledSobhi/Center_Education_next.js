import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import React from 'react'
type BreadCrumbProps = {
  title: string
  subTitle?: string
  pageTitle?: string

  subPageTitle?: string
  subTitleLink?: string
  
  subPageTitleLink?: string
  pageTitleLink?: string
}

export default function BreadCrumb({
  title,
  subTitle,
  pageTitle,

  subPageTitle,
  subTitleLink,

  subPageTitleLink,
  pageTitleLink,
}: BreadCrumbProps
) {
  const locale = useLocale();
  const Icon = locale === "ar" ? ChevronLeft : ChevronRight;

  return (
    <React.Fragment>
      <div className='p-2 px-4 border-b-[0.5px] border-b-gray-200 mb-2.5 bg-white'>
        <h5 className="text-blue-600 text-xl font-bold">{title}</h5>

        <div dir={locale === "ar" ? "ltr" : "rtl"} className="mt-2">
          <ol className="flex items-center flex-wrap text -sm text-gray-700 rtl:flex-row-reverse">
            {subTitle && (
              <li className={`flex items-center ${!pageTitle && "font-bold"}`}>
                {pageTitle && (
                  <Icon size={17} color="gray" strokeWidth={2} className='mx-1' />
                )}

                <Link 
                  href={subTitleLink ?? "#"} 
                  className="hover:text-blue-600"
                >
                  {subTitle}
                </Link>
              </li>
            )}

            {pageTitle && (
              <li
                className={`flex items-center ${!subPageTitle && "font-bold"}`}
              >
                {subPageTitle && (
                  <Icon size={17} color="gray" strokeWidth={2} className='mx-1' />
                )}

                <Link 
                  href={pageTitleLink ?? "#"} 
                  className="hover:text-blue-600"
                >
                  {pageTitle}
                </Link>
              </li>
            )}

            {subPageTitle && (
              <li className="breadcrumb-item  flex items-center active font-bold ">
                <Link
                  href={subPageTitleLink ?? "#"}
                  className="hover:text-blue-600"
                >
                  {subPageTitle}
                </Link>
              </li>
            )}            
          </ol>
        </div>
      </div>
    </React.Fragment>
  )
}
