import { useState } from 'react';
import { DedicationLayout } from '../DedicationLayout';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useGetLatestPublicMessage, useSubmitPublicMessage } from '../../hooks/usePublicLatestMessage';
import { Loader2, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

export function PublicLatestMessageSection() {
  const [messageInput, setMessageInput] = useState('');
  const { data: latestMessage, isLoading: isLoadingMessage } = useGetLatestPublicMessage();
  const submitMutation = useSubmitPublicMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage) {
      toast.error('Please enter a message');
      return;
    }

    try {
      await submitMutation.mutateAsync(trimmedMessage);
      setMessageInput('');
      toast.success('Message submitted successfully!');
    } catch (error) {
      console.error('Failed to submit message:', error);
      toast.error('Failed to submit message. Please try again.');
    }
  };

  return (
    <section id="public-message" className="py-20 sm:py-32 bg-muted/30">
      <DedicationLayout>
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <MessageSquare className="w-12 h-12 text-primary" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Share Your Message
            </h2>
            <p className="text-muted-foreground">
              Leave a message for everyone to see. Only the latest message is displayed.
            </p>
          </div>

          {/* Current Latest Message Display */}
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Latest Message
            </h3>
            {isLoadingMessage ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap break-words">
                {latestMessage || 'No messages yet. Be the first to share!'}
              </p>
            )}
          </div>

          {/* Message Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message-input" className="text-base font-medium">
                Your Message
              </Label>
              <Textarea
                id="message-input"
                placeholder="Type your message here..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="min-h-[120px] resize-none"
                disabled={submitMutation.isPending}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitMutation.isPending || !messageInput.trim()}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Message
                </>
              )}
            </Button>
          </form>
        </div>
      </DedicationLayout>
    </section>
  );
}
