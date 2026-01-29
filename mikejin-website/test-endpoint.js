
const payload = { "nome": "Teste Debug", "email": "teste@mike.pt", "mensagem": "Isto e um teste" };
console.log('Sending request...');
fetch('https://pbrigzfmfirhgxvnpale.supabase.co/functions/v1/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmlnemZtZmlyaGd4dm5wYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTk5MjUsImV4cCI6MjA4NTI3NTkyNX0.T4pozjkyKIxqug6oS7VmkcwACpui7gfR_WedlcSGJWI'
    },
    body: JSON.stringify(payload)
})
    .then(async r => {
        console.log('Status:', r.status);
        const text = await r.text();
        console.log('Body:', text);
    })
    .catch(e => console.error('Error:', e));
