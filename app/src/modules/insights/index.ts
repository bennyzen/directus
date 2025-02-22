import InsightsOverview from './routes/overview.vue';
import InsightsDashboard from './routes/dashboard.vue';
import InsightsPanelConfiguration from './routes/panel-configuration.vue';
import { defineModule } from '@directus/shared/utils';

export default defineModule({
	id: 'insights',
	name: '$t:insights',
	icon: 'insights',
	routes: [
		{
			name: 'insights-overview',
			path: '',
			component: InsightsOverview,
		},
		{
			name: 'insights-dashboard',
			path: ':primaryKey',
			component: InsightsDashboard,
			props: true,
			children: [
				{
					name: 'panel-detail',
					path: ':panelKey',
					props: true,
					components: {
						detail: InsightsPanelConfiguration,
					},
				},
			],
		},
	],
	order: 20,
	preRegisterCheck(user, permissions) {
		const admin = user.role.admin_access;

		if (admin) return true;

		const permission = permissions.find(
			(permission) => permission.collection === 'directus_dashboards' && permission.action === 'read'
		);

		return !!permission;
	},
});
