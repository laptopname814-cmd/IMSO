const express = require('express');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const DATABASE_FILE = 'database.json';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function loadDatabase() {

    if (!fs.existsSync(DATABASE_FILE)) {

        fs.writeFileSync(
            DATABASE_FILE,
            JSON.stringify({
                customers: [],
                suppliers: [],
                products: [],
                sales: [],
                purchases: [],
                saleInvoices: [],
                purchaseInvoices: [],
                purchaseVouchers: [],
                customerPayments: [],
                creditCustomerVouchers: [],
                creditPurchaseVouchers: [],
                accountCategories: [],
                rawMaterialIssues: [],
                production: [],
                reports: [],
                erp_users: [],
                erp_activity: []
            }, null, 2)
        );

    }

    return JSON.parse(
        fs.readFileSync(
            DATABASE_FILE,
            'utf8'
        )
    );

}

app.get('/load-data', (req, res) => {

    try {

        const db = loadDatabase();

        res.json(db);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false
        });

    }

});

app.post('/save-data', (req, res) => {

    try {

        const db = loadDatabase();

        db[req.body.key] = req.body.data;

        fs.writeFileSync(
            DATABASE_FILE,
            JSON.stringify(
                db,
                null,
                2
            )
        );

        io.emit('dataUpdated', {
            key: req.body.key
        });

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false
        });

    }

});

io.on('connection', (socket) => {

    console.log(
        'Connected:',
        socket.id
    );

    socket.on('disconnect', () => {

        console.log(
            'Disconnected:',
            socket.id
        );

    });

});

const PORT = 3000;

server.listen(PORT, '0.0.0.0', () => {

    console.log('');
    console.log('====================================');
    console.log('ERP SERVER RUNNING');
    console.log('====================================');
    console.log(`http://localhost:${PORT}`);
    console.log('====================================');
    console.log('');

});