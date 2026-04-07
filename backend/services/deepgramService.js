const axios = require('axios');
const { DEEPGRAM_API_KEY } = require('../config/config');

const getDeepgramBalance = async () => {
    try {
        console.log('Fetching Deepgram balance...');
        const projectsResponse = await axios.get('https://api.deepgram.com/v1/projects', {
            headers: {
                'Authorization': `Token ${DEEPGRAM_API_KEY}`
            }
        });

        const projects = projectsResponse.data.projects;
        if (!projects || projects.length === 0) {
            return {
                status: 'Connected',
                projectName: 'No projects found',
                projectId: 'N/A'
            };
        }

        const primaryProject = projects[0];
        
        // Attempt to fetch balance for the first project
        let balanceInfo = 'Available';
        try {
            const balanceResponse = await axios.get(`https://api.deepgram.com/v1/projects/${primaryProject.project_id}/balances`, {
                headers: {
                    'Authorization': `Token ${DEEPGRAM_API_KEY}`
                }
            });
            if (balanceResponse.data && balanceResponse.data.balances && balanceResponse.data.balances.length > 0) {
                const b = balanceResponse.data.balances[0];
                balanceInfo = `$${b.amount} ${b.units}`;
            }
        } catch (balanceError) {
            console.warn('Could not fetch specific balance, using generic info');
        }

        console.log('Deepgram balance info processed successfully');
        return {
            status: 'Connected',
            projectName: primaryProject.name,
            projectId: primaryProject.project_id,
            balance: balanceInfo
        };
    } catch (error) {
        console.error('Error fetching Deepgram balance info:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Message:', error.message);
        }
        throw error;
    }
};

module.exports = { getDeepgramBalance };
