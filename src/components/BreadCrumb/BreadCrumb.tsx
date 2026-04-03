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

export default function BreadCrumb(
{
    title,
    subTitle,
    pageTitle,

    subPageTitle,
    subTitleLink,

    subPageTitleLink,
    pageTitleLink,
}: BreadCrumbProps
) {
  return (
    <React.Fragment>
      <div className='p-1 2 px-4 border-b-2 border-b-gray-200 mb-2.5'>
        <h5 className="text-blue-600 text-xl font-bold">{title}</h5>

        <div className="breadcrumbs">
          <ul >
            {subTitle && (
              <li className="breadcrumb-item ">
                <Link href={subTitleLink ?? "#"}>{subTitle}</Link>
              </li>
            )}
            {pageTitle && (
              <li
                className={
                  subPageTitle
                    ? "breadcrumb-item  "
                    : "breadcrumb-item active fw-bold"
                }
              >
                <Link href={pageTitleLink ?? "#"}>{pageTitle}</Link>
              </li>
            )}
            {subPageTitle && (
              <li className="breadcrumb-item active fw-bold">
                <Link href={subPageTitleLink ?? "#"}>{subPageTitle}</Link>
              </li>
            )}            
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}
