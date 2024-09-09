import { Post } from "../types/post";

const posts: Record<string, Post> = {
    //name of file: require('./name of file).default,
    //testLeo: require('./testLeo').default,
	//[REPLACE]
	lastMinuteSeattleSeahawksMock: require('./lastMinuteSeattleSeahawksMock').default,
	oldSeahawksOffseasonPickups: require('./oldSeahawksOffseasonPickups').default,
	offseasonPickups2022: require('./offseasonPickups2022').default,
	oldSeahawksOffensiveDraftTargets: require('./oldSeahawksOffensiveDraftTargets').default,
	oldSeahawksDefensivePositionDraft: require('./oldSeahawksDefensivePositionDraft').default,
	oldTheCaseForBakerMayfieldTo: require('./oldTheCaseForBakerMayfieldTo').default,
	positionalOverviewOfTheSeattle: require('./positionalOverviewOfTheSeattle').default,
	oldTheCaseForGardnerMinshew: require('./oldTheCaseForGardnerMinshew').default,
	oldSeattleSeahawksDraftRecap: require('./oldSeattleSeahawksDraftRecap').default,
	oldReturnOfTheBigGunsTheTop: require('./oldReturnOfTheBigGunsTheTop').default,
	oldPositionalOverviewOfTheSeattled: require('./oldPositionalOverviewOfTheSeattled').default,
	oldTheCaseForDrewLockToBe: require('./oldTheCaseForDrewLockToBe').default,
	oldPositionalOverviewOfTheSeattle: require('./oldPositionalOverviewOfTheSeattle').default,
	oldTheCaseForGenoSmithToBe: require('./oldTheCaseForGenoSmithToBe').default,
	HeadlinesBeforeTheSeahawksMnf: require('./HeadlinesBeforeTheSeahawksMnf').default,
	takeawaysFromSeahawksWinOver: require('./takeawaysFromSeahawksWinOver').default,
	MatchupsToWatchDuringers: require('./MatchupsToWatchDuringers').default,
	takeawaysFromSeahawksLossToers0: require('./takeawaysFromSeahawksLossToers0').default,
	stockCheckWeekProspectRisers: require('./stockCheckWeekProspectRisers').default,
	MatchupsForSeahawksVsFalcons: require('./MatchupsForSeahawksVsFalcons').default,
	seahawksMissedExpectationsEntering: require('./seahawksMissedExpectationsEntering').default,
	flightRadarPotentialSeahawksOn: require('./flightRadarPotentialSeahawksOn').default,
	MatchupsForSeahawksVsLions: require('./MatchupsForSeahawksVsLions').default,
	seahawksWinOverLionsTakeaways: require('./seahawksWinOverLionsTakeaways').default,
	MatchupsForSeahawksVsSaints: require('./MatchupsForSeahawksVsSaints').default,
	takeawaysFromSeahawksLossToThe: require('./takeawaysFromSeahawksLossToThe').default,
	MatchupsInSeahawksVsCardinals: require('./MatchupsInSeahawksVsCardinals').default,
	takeawaysFromTheSeahawksWinOver: require('./takeawaysFromTheSeahawksWinOver').default,
	MatchupsForSeahawksVsChargers: require('./MatchupsForSeahawksVsChargers').default,
	takeawaysFromTheSeahawksWinOver0: require('./takeawaysFromTheSeahawksWinOver0').default,
	MatchupsForSeahawksVsGiants: require('./MatchupsForSeahawksVsGiants').default,
	analysisSeahawksEmergingDefensive: require('./analysisSeahawksEmergingDefensive').default,
	whoFellOffADeepLookIntoPreseason: require('./whoFellOffADeepLookIntoPreseason').default,
	takeawaysFromTheSeahawksWinOverCd: require('./takeawaysFromTheSeahawksWinOverCd').default,
	theSeahawksExpectedRevampedDefensive: require('./theSeahawksExpectedRevampedDefensive').default,
	MatchupsForSeahawksVsCardinalsCe: require('./MatchupsForSeahawksVsCardinalsCe').default,
	takeawaysFromSeahawksVsCardinals: require('./takeawaysFromSeahawksVsCardinals').default,
	whosInWhosOutCfpTopPrediction: require('./whosInWhosOutCfpTopPrediction').default,
	MatchupsForSeahawksVsBuccaneers: require('./MatchupsForSeahawksVsBuccaneers').default,
	analysisHowSeattlesTightsEnds: require('./analysisHowSeattlesTightsEnds').default,
	takeawaysFromSeahawksLossToBuccaneers: require('./takeawaysFromSeahawksLossToBuccaneers').default,
	MatchupsForSeahawksVsRaiders: require('./MatchupsForSeahawksVsRaiders').default,
	analysisImprovingSeahawksSpecial: require('./analysisImprovingSeahawksSpecial').default,
	takeawaysFromSeahawksLossToRaiders: require('./takeawaysFromSeahawksLossToRaiders').default,
	MatchupsForSeahawksVsRams: require('./MatchupsForSeahawksVsRams').default,
	takeawaysFromSeahawksWinOver0: require('./takeawaysFromSeahawksWinOver0').default,
	MatchupsForSeahawksVsPanthers: require('./MatchupsForSeahawksVsPanthers').default,
	analysisSeahawksImprovingLbs: require('./analysisSeahawksImprovingLbs').default,
	takeawaysFromSeahawksLossToPanthers: require('./takeawaysFromSeahawksLossToPanthers').default,
	NflDraftScoutingTrentonSimpson: require('./NflDraftScoutingTrentonSimpson').default,
	MatchupsForSeahawksVsers: require('./MatchupsForSeahawksVsers').default,
	takeawaysFromSeahawksLossToThee: require('./takeawaysFromSeahawksLossToThee').default,
	opinionTheSeahawksFutureIsHere: require('./opinionTheSeahawksFutureIsHere').default,
	MatchupsForSeahawksVsJets: require('./MatchupsForSeahawksVsJets').default,
	darrellTaylorsEmergenceAndWhy: require('./darrellTaylorsEmergenceAndWhy').default,
	takeawaysFromSeahawksWinOvere: require('./takeawaysFromSeahawksWinOvere').default,
	MatchupsForSeahawksFinaleVs: require('./MatchupsForSeahawksFinaleVs').default,
	takeawaysFromSeahawksWinVsRams: require('./takeawaysFromSeahawksWinVsRams').default,
	MatchupsForTheSeahawksPlayoff: require('./MatchupsForTheSeahawksPlayoff').default,
	takeawaysFromSeahawksWildCard: require('./takeawaysFromSeahawksWildCard').default,
	NflDraftScoutingChristian: require('./NflDraftScoutingChristian').default,
	superBowlPredictions: require('./superBowlPredictions').default,
	theSeahawksImpendingFreeAgents0: require('./theSeahawksImpendingFreeAgents0').default,
	freeAgencyMarketOverviewPosition: require('./freeAgencyMarketOverviewPosition').default,
	theSeahawksImpendingFreeAgents: require('./theSeahawksImpendingFreeAgents').default,
	NflDraftScoutingDaiyanHenley: require('./NflDraftScoutingDaiyanHenley').default,
	freeAgencyMarketOverviewPositionAe: require('./freeAgencyMarketOverviewPositionAe').default,
	freeAgencyMarketOverviewPositionE: require('./freeAgencyMarketOverviewPositionE').default,
	freeAgencyMarketOverviewPositionF: require('./freeAgencyMarketOverviewPositionF').default,
	recappingSeahawksFreeAgencyMoves: require('./recappingSeahawksFreeAgencyMoves').default,
	seahawksEarlyAprilMockDraft: require('./seahawksEarlyAprilMockDraft').default,
	whyJalenCarterIsASeahawkEverything: require('./whyJalenCarterIsASeahawkEverything').default,
	seahawksEarlyMidAprilMockDraft: require('./seahawksEarlyMidAprilMockDraft').default,
	grandSeahawksMidLateAprilMock: require('./grandSeahawksMidLateAprilMock').default,
	seahawksMidLateAprilMockDraft: require('./seahawksMidLateAprilMockDraft').default,
	seattlesTargetsCoverCornerbacks: require('./seattlesTargetsCoverCornerbacks').default,
	TopAnthonyRichardsonAndWill: require('./TopAnthonyRichardsonAndWill').default,
	dayTargetsTyreeWilsonDevon: require('./dayTargetsTyreeWilsonDevon').default,
	seahawksFinalLateAprilMockDraft: require('./seahawksFinalLateAprilMockDraft').default,
	topDefensiveLinemenMaziSmith: require('./topDefensiveLinemenMaziSmith').default,
	everythingSeahawksDemetrisHarris: require('./everythingSeahawksDemetrisHarris').default,
	everythingSeahawksDavidHowesJerrick: require('./everythingSeahawksDavidHowesJerrick').default,
	seahawksRbProfileOffseason: require('./seahawksRbProfileOffseason').default,
	seahawksWrProfileOffseason: require('./seahawksWrProfileOffseason').default,
	howMikeJackIsEmbracingTheNew: require('./howMikeJackIsEmbracingTheNew').default,
	seahawksHeadlinesEnteringThe: require('./seahawksHeadlinesEnteringThe').default,
	seahawksTakeawaysFromLossToRams: require('./seahawksTakeawaysFromLossToRams').default,
	headlinesForSeahawksVsLions: require('./headlinesForSeahawksVsLions').default,
	takeawaysFromShootoutWinAgainst: require('./takeawaysFromShootoutWinAgainst').default,
	headlinesForSeahawksVsPanthers: require('./headlinesForSeahawksVsPanthers').default,
	takeawaysFromSeahawksWinAgainst: require('./takeawaysFromSeahawksWinAgainst').default,
	headlinesForSeahawksVsGiants: require('./headlinesForSeahawksVsGiants').default,
	takeawaysFromSeahawksWinAgainstF: require('./takeawaysFromSeahawksWinAgainstF').default,
	headlinesForSeahawksVersusBengals: require('./headlinesForSeahawksVersusBengals').default,
	takeawaysFromBengalsVsSeahawks: require('./takeawaysFromBengalsVsSeahawks').default,
	headlinesForSeahawksVsBrowns: require('./headlinesForSeahawksVsBrowns').default,
	takeawaysFromSeahawksVsBrowns: require('./takeawaysFromSeahawksVsBrowns').default,
	headlinesForSeahawksVsCardinals: require('./headlinesForSeahawksVsCardinals').default,
	takeawaysFromSeahawksVsCardinalsCaf: require('./takeawaysFromSeahawksVsCardinalsCaf').default,
	seahawksMidseasonGrades: require('./seahawksMidseasonGrades').default,
	headlinesForSeahawksVsRavens: require('./headlinesForSeahawksVsRavens').default,
	takeawaysFromRavensVsSeahawks: require('./takeawaysFromRavensVsSeahawks').default,
	headlinesForSeahawksVsCommanders: require('./headlinesForSeahawksVsCommanders').default,
	takeawaysFromTheSeahawksWinOverDa: require('./takeawaysFromTheSeahawksWinOverDa').default,
	headlinesForSeahawksVsRamsGame: require('./headlinesForSeahawksVsRamsGame').default,
	takeawaysFromSeahawksVsRams: require('./takeawaysFromSeahawksVsRams').default,
	headlinesForTheSeahawksVsers: require('./headlinesForTheSeahawksVsers').default,
	takeawaysFromTheLossToTheers: require('./takeawaysFromTheLossToTheers').default,
	headlinesForSeahawksVsCowboys: require('./headlinesForSeahawksVsCowboys').default,
	takeawaysFromSeahawksVsCowboys: require('./takeawaysFromSeahawksVsCowboys').default,
	headlinesForTheSeahawksAgainstd: require('./headlinesForTheSeahawksAgainstd').default,
	takeawaysFromSeahawksThrilling: require('./takeawaysFromSeahawksThrilling').default,
	headlinesForTheSeahawksAgainst: require('./headlinesForTheSeahawksAgainst').default,
	takeawaysFromSeahawksLossToers: require('./takeawaysFromSeahawksLossToers').default,
	seahawksVsTitansHeadlines: require('./seahawksVsTitansHeadlines').default,
	takeawaysFromSeahawksWinOverb: require('./takeawaysFromSeahawksWinOverb').default,
	MatchupsForSeahawksVsChiefs: require('./MatchupsForSeahawksVsChiefs').default,
	seahawksPostFreeAgencyMockDraft: require('./seahawksPostFreeAgencyMockDraft').default,
	howMichaelBigGucciJerrellUsed: require('./howMichaelBigGucciJerrellUsed').default,
	seahawksRookiePrimerHowDoThey: require('./seahawksRookiePrimerHowDoThey').default,
	JerrellPreTrainingCampInterview: require('./JerrellPreTrainingCampInterview').default,
	RolandTankTrembleUnderdog: require('./RolandTankTrembleUnderdog').default,
	rosterOffensivePredictions: require('./rosterOffensivePredictions').default,
	darrellTaylorTrade: require('./darrellTaylorTrade').default,
	rosterDefensivePrediction: require('./rosterDefensivePrediction').default,
	Headlines2024Week1: require('./Headlines2024Week1').default,
	takeawaysFromSeahawksWinVsBroncos: require('./takeawaysFromSeahawksWinVsBroncos').default,
};

export default posts;
