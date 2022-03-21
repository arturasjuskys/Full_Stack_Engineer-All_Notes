# Securing School Data: Data Security
A local elementary school’s database was recently hacked. While the administration believes sensitive information of the students was not the target of this breach, they do not want similar incidents to occur in the future. You and a group of other cybersecurity engineers decide to volunteer your time to secure the school’s Postgres database.

Volunteers were shocked to find that the current configuration of Postgres allowed anyone to connect to the school’s database! The group tasked you to update the broken authentication and access control.

Volunteers also discovered that the school wrote some scripts to generate demographic data. The school shares these scripts with the rest of the schools in the district through a public repository. These scripts, however, contain sensitive data such as API keys for both its local and district database servers. You need to make sure that sensitive information is no longer exposed to the public.
