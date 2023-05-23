<h1>Book Library API</h1>
<p>The Book Library API allows users to create accounts, list books, and request to loan other users' books.</p>

<h2>Learning Objectives</h2>
<ol>
  <li>Interpret User Stories and use them to plan work.</li>
  <li>Setup an Express API using node-postgres, Sequelize, Mocha/Chai and Supertest for testing.</li>
  <li>Use advanced Sequelize schema validation, error handling and establish complex relationships between database tables.</li>
  <li>Refactor to use helpers and make code DRY.</li>
</ol>

<h2>Getting Started</h2>
<p>To use the Book Library API, follow the instructions below:</p>

<h3>Installation</h3>
<p>Clone the repository:</p>
<pre><code>git clone https://github.com/your-username/book-library.git</code></pre>

<p>Install the dependencies:</p>
<pre><code>npm install</code></pre>

<h3>Usage</h3>
<p>Start the server:</p>
<pre><code>npm start</code></pre>

<p>The server will start running on <code>http://localhost:4000</code>.</p>

<h2>API Endpoints Example - /readers</h2>

<h3>GET /</h3>
<p>Returns a greeting message.</p>

<h3>POST /readers</h3>
<p>Creates a new reader in the database.</p>

<h3>GET /readers</h3>
<p>Gets all readers records.</p>

<h3>GET /readers/:id</h3>
<p>Gets a reader record by ID.</p>

<h3>PATCH /readers/:id</h3>
<p>Updates a reader's email by ID.</p>

<h3>DELETE /readers/:id</h3>
<p>Deletes a reader record by ID.</p>

<h2>Testing</h2>
<p>The Book Library API includes unit tests to ensure its functionality. To run the tests, use the following command:</p>
<pre><code>npm test</code></pre>

<h2>Contributing</h2>
<p>Contributions are welcome! If you'd like to contribute to the Book Library API, please follow these guidelines:</p>
<ul>
  <li>Fork the repository</li>
  <li>Create a new branch</li>
  <li>Make your changes</li>
  <li>Submit a pull request</li>
</ul>
