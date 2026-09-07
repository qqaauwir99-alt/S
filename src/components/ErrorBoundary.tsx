import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 text-right" dir="rtl">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#0B1714] border border-[#C5A96A]/30 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#10221E] border border-[#C5A96A]/40 text-[#C5A96A] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F3EFE5] font-heritage">
              {this.props.fallbackTitle || 'حدث تنبيه في عرض الشجرة'}
            </h3>
            <p className="text-xs text-[#A39D8F] leading-relaxed">
              يمكنك إعادة تهيئة العرض أو تحديث الصفحة لمواصلة التصفح بسلاسة.
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#19312A] hover:bg-[#203f36] border border-[#C5A96A]/50 text-[#C5A96A] font-semibold text-xs transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة تحميل الصفحة</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
