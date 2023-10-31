import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
	const open = await prisma.issue.count({ where: { status: "OPEN" } });
	const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
	const inProgress = await prisma.issue.count({
		where: { status: "IN_PROGRESS" },
	});

	const data = { open: open, closed: closed, inProgress: inProgress };

	return (
		<Grid columns={{ initial: "1", md: "2" }} gap="5">
			<Flex direction="column" gap="5">
				<IssueSummary {...data} />
				<IssueChart {...data} />
			</Flex>
			<LatestIssues />
		</Grid>
	);
}
