//https://www.twilio.com/blog/manipulate-notion-database-using-node-js
//Importazione
const express = require('express');
var path = require('path');
const dotenv = require('dotenv');
const { Client } = require('@notionhq/client');
const app = express();
app.use(express.static(path.join(__dirname,"public")));
console.log(app.use(express.static(path.join(__dirname,"public"))));
app.use(express.urlencoded({ extended: true }));
dotenv.config();

//variabile client che autorizza API key ha trovare il file .env e accedere tramite la libreria dotenv
const notion = new Client({auth: process.env.NOTION_API_KEY});

//variabile che richiama il valore all'interno .env
const databaseID = process.env.NOTION_DATABASE_ID;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/aggiungi', async (req, res) => {
    const { post, url, autore } = req.body;


    try {
        const response = await notion.pages.create({
            parent: {
                database_id: databaseID,
            },
            properties: {
                'Post': {
                    title: [
                        {
                            type: 'text',
                            text: {
                                content: post,
                            },
                        },
                    ],
                },
                'URL': {
                    url: url,
                },
                'Autore': {
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: autore,
                            },
                        },
                    ],
                },
            },
        });
        console.log(response);

        res.redirect('/');
       
    } catch (error) {
        console.error("Error creating Notion page:", error);
        res.send('Si è verificato un errore durante l\'aggiunta del post.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
/*const readUlr = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
*/
/*
async function aggiungiDatabase(databaseID, post, postLink, autore) {
    try {
        const response = await notion.pages.create({
            parent: {
                database_id: databaseID,
            },
            properties: {
                'Post': {
                    title: [
                        {
                            type: 'text',
                            text: {
                                content: post,
                            },
                        },
                    ],
                },
                'URL': {
                    url: postLink,
                },
                'Autore': {
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: autore,
                            },
                        },
                    ],                   
                },
            },
        });
        console.log(response);
    } catch (error) {
        console.error("Error creating Notion page:", error);
    }
}

aggiungiDatabase(databaseID,'💡.𝐍𝐄𝐓 𝐂𝐨𝐥𝐥𝐞𝐜𝐭𝐢𝐨𝐧𝐬 𝐏𝐚𝐫𝐭 2','https://www.linkedin.com/posts/thisisnabi_net-collections-part-2-activity-7095110271228096512-4YS9?utm_source=share&utm_medium=member_desktop', 'Nabi Karampoor');
*/