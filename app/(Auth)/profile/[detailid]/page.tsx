export default async function Profile ({params,}: {params: Promise<{detailid:string}>}){
const detailid = (await params).detailid
    return(
    <div className="min-h-screen">
        
    </div>
)
}