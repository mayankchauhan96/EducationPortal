import AdminResourcePage from "./AdminResourcePage";
import { getAdminProjects, createProject, updateProject, deleteProject } from "../../api/adminApi";
const emptyItem={title:"",slug:"",description:"",difficulty:"Beginner",gradeRange:"",skills:"",imageUrl:"",videoUrl:"",displayOrder:0,published:true,programIds:[]};
const fields=[
 {key:"title",label:"Title"},{key:"slug",label:"Slug"},{key:"description",label:"Description",type:"textarea"},
 {key:"difficulty",label:"Difficulty"},{key:"gradeRange",label:"Grade range"},{key:"skills",label:"Skills"},
 {key:"imageUrl",label:"Image URL"},{key:"videoUrl",label:"Video URL"},{key:"displayOrder",label:"Display order",type:"number"},{key:"published",label:"Published",type:"boolean"}
];
export default function AdminProjectsPage(){return <AdminResourcePage title="Projects" subtitle="Manage student projects and their media." load={getAdminProjects} create={createProject} update={updateProject} remove={deleteProject} fields={fields} emptyItem={emptyItem}
columns={[{key:"title",label:"Title"},{key:"difficulty",label:"Difficulty"},{key:"gradeRange",label:"Grade range"},{key:"published",label:"Status"}]}/>;}
