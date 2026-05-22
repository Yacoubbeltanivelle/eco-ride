$reminder = @'

[PROJECT PROTOCOL REMINDER]
ECO RIDE rule: BEFORE responding, you MUST invoke the skill-router skill (Skill tool, name="skill-router") to identify which of the 115 available skills applies to this request. Skip ONLY for trivial replies (greetings, "ok", "thanks", single-word confirmations). For complex multi-skill tasks (>3 skills), delegate to the task-routing-architect agent. See CLAUDE.md "PROTOCOLE OBLIGATOIRE" section.

'@

Write-Output $reminder
