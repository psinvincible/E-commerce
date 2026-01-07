import Link from 'next/link'
import React from 'react'

const AdminLink = ({href, label}) => {
  return (
    <Link href={href} className="bg-black text-white rounded-xl p-4 text-center hover:bg-gray-900 transition">{label}</Link>
  )
}

export default AdminLink;
