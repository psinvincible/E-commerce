
export default function Stat({title, value}) {
    return(
        <div className="bg-gray-200 rounded-xl shadow p-4 hover:bg-gray-100">
            <p className="text-sm text-gray-500 h-[50%]">{title}</p>
            <p className="text-2xl font-bold mt-1 text-center">{value}</p>
        </div>
    )
    
}
