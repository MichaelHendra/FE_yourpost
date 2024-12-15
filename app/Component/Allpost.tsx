import Cardpost from "./Cardpost";

export default function Allpost(){
    return(
        <div className="px-10">
            <div className="overflow-hidden">
                <p className="text-2xl py-4">Recent video</p>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="flex items-center">
                        <Cardpost />
                    </div>
                    <div className="flex items-center">
                        <Cardpost />
                    </div>
                    <div className="flex items-center">
                        <Cardpost />
                    </div>
                    <div className="flex items-center">
                        <Cardpost />
                    </div>
                    <div className="flex items-center">
                        <Cardpost />
                    </div>
                    <div className="flex items-center">
                        <Cardpost />
                    </div>
                </div>
            </div>
        </div>
    )
}