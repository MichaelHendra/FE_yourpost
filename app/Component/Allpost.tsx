import Cardpost from "./Cardpost";

export default function Allpost(){
    return(
        <div className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="flex items-center">
                    <Cardpost />
                </div>
            </div>
        </div>
    )
}