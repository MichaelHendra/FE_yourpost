
export default function Videoplayer ({src, poster}){
    return(
        <div className="max-w-4xl mx-auto">
            <div className="relative w-full overflow-hidden bg-black rounded-lg shadow-lg aspect-video">
                <video className="w-full h-full" controls poster={poster}>
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag
                </video>
            </div>
        </div>
    )
}