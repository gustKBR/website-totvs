function Header (){
  document.getElementById('navbar').innerHTML = `
  <nav>
    <div class="first-bar"></div>
    <div class="second-bar"></div>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="form.html">Formulário</a></li>
      <li><a href="fluig.html">Fluig</a></li>
      <li><a href="blog.html">Blog</a></li>
    </ul>
  </nav>
  `
}
Header()