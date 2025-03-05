<svelte:head>
  <title>Contact</title>
</svelte:head>
<h1>Contact</h1>
    <form action="mailto:acevedo@mit.edu" method="POST" enctype="text/plain">
      <label>
        Email:
        <input name="email" type="email" />
      </label>
      <label>
        Subject:
        <input name="subject" type="text" />
      </label>
      <label>
        Message:
        <textarea name="body"></textarea>
      </label>
      <button>Send</button>
    </form>