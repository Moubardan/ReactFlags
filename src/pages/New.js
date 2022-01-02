import Navigation from "../components/Navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Article from "../components/Article";
function News() {
  const [newsData, setNewsData] = useState([]);
  const [author,setAuthor] = useState("");
  const [content,setContent] = useState("");
  const [error,setError] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://localhost:3003/articles")
      .then((res) => setNewsData(res.data));
  };
const handleSubmit = (e) =>{
  e.preventDefault();
  if(content.length < 140){
    setError(true)
  }else{
  axios.post("http://localhost:3003/articles",{
    author,
    content,
    date: Date.now()
  }
  ).then(()=>{
    setError(false)
    setAuthor("");
    setContent("");
    getData()
  })
}}
  return (
    <div className="news-container">
      <Navigation />
      <h1>News</h1>

      <form onSubmit={(e)=> handleSubmit(e)} >
        <input onChange={(e) => setAuthor(e.target.value)} value={author} type="text" placeholder="Nom" />
        <textarea style={{border: error ? "1px solid red" : "1px solid #61dafb"}}  onChange={(e) => setContent(e.target.value)}  value={content}   placeholder="Message"></textarea>
        {error && <p> The minimum size must be 140 caracters </p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul> 
        {newsData.sort((a,b) => b.date - a.date).map((article) => {
          return <Article key={article.id} article={article} />;
        })}
      </ul>
    </div>
  );
}

export default News;
