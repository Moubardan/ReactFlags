  import axios from 'axios'

function DeleteArticle({id}) {

  const handleDelete = () =>{
    axios.delete("http://localhost:3003/articles/" + id);
    window.location.reload()
  }
  return ( 
    <button onClick={() => {
      if(window.confirm("Are you sur you want to delete this article")){
        handleDelete()
      }
    }} >Delete</button>
   );
}

export default DeleteArticle;