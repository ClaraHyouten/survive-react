export function QuestList({quests, onValidateQuest}) {

    function getQuestStatus(quest) {
        //If previous quest is completed, return "in-progress"
        if (quest.completed) {
            return "completed";
        } else {
            const questIndex = quests.findIndex(q => q.id === quest.id);
            if (quests[questIndex - 1]?.completed || questIndex === 0) {
                return "in-progress";
            } else {
                return "not-started";
            }
        }
    }

    function renderQuestStatus(quest) {
        const colors = {
            "completed": "bg-blue-500",
            "in-progress": "bg-yellow-500",
            "not-started": "bg-white"
        }
        const questStatus = getQuestStatus(quest);
        const color = colors[questStatus];
        return (
            <div className={`w-4 h-4 rounded ${color} mr-2 leading-none`}>
                {quest.completed && <span className="text-white font-bold leading-none text-sm ml-0.5">⛌</span>}
            </div>
        );
    }

    const filteredQuests = quests.filter((quest, index) => {
        return !quests[index + 1]?.completed;
    }).slice(0, 3);

    return (
        <ul className="bg-blue-100 flex flex-col items-center rounded-xl border-1 border-blue-200 w-72">
            {
                filteredQuests.map((quest) => (
                    <li key={quest.id} className="flex w-full p-4 border-b border-blue-200 last:border-b-0 items-center" onClick={()=>onValidateQuest(quest.id)}>
                        { renderQuestStatus(quest) }
                        <div className="flex flex-col flex-1">
                            <p className="font-bold leading-none text-sm">{quest.name}</p>
                            <p className="leading-none text-xs">{quest.description}</p>
                        </div>
                    </li>
                ))
            }

            {
                filteredQuests.length === 1 && (
                    <li className="flex w-full p-4 border-b border-blue-200 last:border-b-0 items-center">
                        <div className="flex flex-col flex-1">
                            <p className="font-bold leading-none text-sm">Bravo vous avez terminé toutes les quêtes !</p>
                        </div>
                    </li>
                )
            }
        </ul>
    );
}