// routes/dataRoutes.js
import express from 'express';
import {
    getKpis,
    getAlertsTrend,
    getUserRoles,
    getThreatTypes,
    getLiveAlerts
} from '../controllers/dataController.js';

const router = express.Router();

// ✳️ 1. Basic Dashboard Data (from mock controllers)
router.get('/kpis', getKpis);
router.get('/alerts/trend', getAlertsTrend);
router.get('/users/roles', getUserRoles);
router.get('/threats/types', getThreatTypes);
router.get('/alerts/live', getLiveAlerts);

// ✳️ 2. Wazuh-style Alerts
router.get('/alerts', (req, res) => {
    res.json([
        { id: 1, source: "Firewall", type: "Port Scan", severity: "High", timestamp: "2025-07-17T10:10:00Z" },
        { id: 2, source: "SIEM", type: "Brute Force", severity: "Critical", timestamp: "2025-07-17T10:12:00Z" },
        { id: 3, source: "Web App", type: "SQL Injection", severity: "Medium", timestamp: "2025-07-17T10:15:00Z" }
    ]);
});

// ✳️ 3. OpenCTI-style Threat Intelligence
router.get('/threats', (req, res) => {
    res.json([
        { id: 't1', name: "APT29", category: "Nation-State", tags: ["Russia", "Spear Phishing"] },
        { id: 't2', name: "Emotet", category: "Malware", tags: ["Banking Trojan"] }
    ]);
});

// ✳️ 4. Splunk-style User Activity Logs
router.get('/users/activity', (req, res) => {
    res.json([
        { username: "analyst1", action: "Investigated threat APT29", time: "2025-07-17T09:00:00Z" },
        { username: "admin1", action: "Created new user soc3", time: "2025-07-17T09:10:00Z" },
        { username: "soc1", action: "Acknowledged alert #2", time: "2025-07-17T09:20:00Z" }
    ]);
});
