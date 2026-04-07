const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

const testGrokBalance = async () => {
    console.log('Testing /api/grok-balance...');
    try {
        const response = await axios.get(`${BASE_URL}/grok-balance`);
        if (response.status === 200 && response.data.balance === 100) {
            console.log('✅ Grok balance test passed');
        } else {
            console.error('❌ Grok balance test failed:', response.status, response.data);
        }
    } catch (error) {
        console.error('❌ Grok balance test errored:', error.message);
    }
};

const testDeepgramBalance = async () => {
    console.log('Testing /api/deepgram-balance...');
    try {
        const response = await axios.get(`${BASE_URL}/deepgram-balance`);
        if (response.status === 200 && response.data.projectName) {
            console.log('✅ Deepgram balance test passed');
            console.log(`Project: ${response.data.projectName}`);
        } else {
            console.error('❌ Deepgram balance test failed:', response.status, response.data);
        }
    } catch (error) {
        console.error('❌ Deepgram balance test errored:', error.message);
        if (error.response) {
            console.error('Details:', error.response.data);
        }
    }
};

const runTests = async () => {
    console.log('Starting automated endpoint tests...');
    await testGrokBalance();
    await testDeepgramBalance();
    console.log('Tests complete.');
};

runTests();
