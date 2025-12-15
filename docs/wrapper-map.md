# Wrapper to Endpoint Map

## Stable

| Export | Method | Path | Notes |
| --- | --- | --- | --- |
| listCalls | GET | /v1/calls | Rejects since (deprecated/broken). Use createdAfter and createdBefore. |
| getCallRecordings | GET | /v1/call-recordings/{callId} |  |
| getCallSummary | GET | /v1/call-summaries/{callId} |  |
| getCallTranscript | GET | /v1/call-transcripts/{id} |  |
| listMessages | GET | /v1/messages | Rejects since (deprecated/broken). Use createdAfter and createdBefore. |
| sendMessage | POST | /v1/messages |  |
| getMessage | GET | /v1/messages/{id} |  |
| createContact | POST | /v1/contacts |  |
| getContact | GET | /v1/contacts/{id} |  |
| updateContact | PATCH | /v1/contacts/{id} |  |
| deleteContact | DELETE | /v1/contacts/{id} |  |
| getContactCustomFields | GET | /v1/contact-custom-fields |  |
| listPhoneNumbers | GET | /v1/phone-numbers |  |
| listWebhooks | GET | /v1/webhooks |  |
| getWebhook | GET | /v1/webhooks/{id} |  |
| deleteWebhook | DELETE | /v1/webhooks/{id} |  |
| createCallSummaryWebhook | POST | /v1/webhooks/call-summaries |  |
| createCallTranscriptWebhook | POST | /v1/webhooks/call-transcripts |  |
| createCallWebhook | POST | /v1/webhooks/calls |  |
| createMessageWebhook | POST | /v1/webhooks/messages |  |

## Experimental

| Export | Method | Path | Notes |
| --- | --- | --- | --- |
| sendSms | POST | /v1/messages | Legacy helper; does not match sendMessage payload |
| updateCallRecording | PATCH | /v1/call-recordings/{callId} |  |
| deleteCallRecording | DELETE | /v1/call-recordings/{callId} |  |
| updateCallSummary | PATCH | /v1/call-summaries/{callId} |  |
| deleteCallSummary | DELETE | /v1/call-summaries/{callId} |  |
| updateCallTranscript | PATCH | /v1/call-transcripts/{id} |  |
| deleteCallTranscript | DELETE | /v1/call-transcripts/{id} |  |
| createCall | POST | /v1/calls |  |
| getContacts | GET | /v1/contacts |  |
| createContactCustomField | POST | /v1/contact-custom-fields |  |
| updateMessage | PATCH | /v1/messages/{id} |  |
| deleteMessage | DELETE | /v1/messages/{id} |  |
| listConversations | GET | /v1/conversations |  |
| createConversation | POST | /v1/conversations |  |
| createPhoneNumber | POST | /v1/phone-numbers |  |
| createWebhook | POST | /v1/webhooks |  |
| updateWebhook | PATCH | /v1/webhooks/{id} |  |
| listCallWebhooks | GET | /v1/webhooks/calls |  |
| getMessageWebhooks | GET | /v1/webhooks/messages |  |
| getCallTranscriptWebhooks | GET | /v1/webhooks/call-transcripts |  |
| listCallSummaryWebhooks | GET | /v1/webhooks/call-summaries |  |
| request | - | - | Low-level HTTP helper |
