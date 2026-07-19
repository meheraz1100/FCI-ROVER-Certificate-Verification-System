import { FaSearch } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function TabNavigation({
activeTab,
setActiveTab,
}){

return(

<div className="flex">

<button

onClick={()=>setActiveTab("verify")}

className={`flex-1 py-5 font-semibold

${activeTab==="verify"

?

"bg-[#173f27] border-b-4 border-yellow-500"

:

"bg-[#275c38]"

}`}

>

<FaSearch className="inline mr-2"/>

Verify Certificate

</button>

<button

onClick={()=>setActiveTab("admin")}

className={`flex-1 py-5 font-semibold

${activeTab==="admin"

?

"bg-[#173f27] border-b-4 border-yellow-500"

:

"bg-[#275c38]"

}`}

>

<FaLock className="inline mr-2"/>

Admin Panel

</button>

</div>

)

}